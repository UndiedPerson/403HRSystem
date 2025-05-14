<?php
header('Content-Type: application/json');
include '../config/database.php';

$conn = new mysqli($host, $user, $pass, $dbname);
if ($conn->connect_error) {
    die(json_encode(array("message" => "Connection failed: " . $conn->connect_error)));
}

$search = isset($_GET['search']) ? trim($_GET['search']) : '';
if (empty($search)) {
    echo json_encode(array("message" => "No search query provided."));
    exit;
}

$search = $conn->real_escape_string($search);
$searchFirstChar = mb_substr($search, 0, 1, "UTF-8");

// Query: match only when the field **starts with** the first character of the search string.
$query = "
    SELECT id, name, position, branch, hire_date, contact_number, email, image_path
    FROM employees
    WHERE (
        name LIKE CONCAT(?, '%') OR
        position LIKE CONCAT(?, '%') OR
        branch LIKE CONCAT(?, '%') OR
        email LIKE CONCAT(?, '%')
    )
    ORDER BY name ASC, position ASC, branch ASC
";

$stmt = $conn->prepare($query);
$stmt->bind_param("ssss", $search, $search, $search, $search);
$stmt->execute();
$result = $stmt->get_result();

$employees = [];
while ($row = $result->fetch_assoc()) {
    $employees[] = $row;
}

if (count($employees) > 0) {
    echo json_encode($employees);
} else {
    echo json_encode([]);
}

$stmt->close();
$conn->close();
?>
