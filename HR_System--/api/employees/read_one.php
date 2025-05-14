<?php
header('Content-Type: application/json');
include '../config/database.php';

$conn = new mysqli($host, $user, $pass, $dbname);
if ($conn->connect_error) {
    die(json_encode(array("message" => "Connection failed: " . $conn->connect_error)));
}

$id = isset($_GET['id']) ? $_GET['id'] : die(json_encode(array("message" => "No ID provided.")));

$query = "SELECT id, name, position, branch, hire_date, contact_number, email, image_path FROM employees WHERE id = ?";
$stmt = $conn->prepare($query);
$stmt->bind_param("i", $id);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows == 1) {
    $employee = $result->fetch_assoc();
    echo json_encode($employee);
} else {
    echo json_encode(array("message" => "No employee found with that ID."));
}

$stmt->close();
$conn->close();
?>