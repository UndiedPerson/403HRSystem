<?php
header('Content-Type: application/json');
include '../config/database.php';

$conn = new mysqli($host, $user, $pass, $dbname);
if ($conn->connect_error) {
    die(json_encode(array("message" => "Connection failed: " . $conn->connect_error)));
}

// ตรวจสอบว่ามี id และ confirm_delete หรือไม่
$id = isset($_GET['id']) ? $_GET['id'] : null;
$confirmation = isset($_GET['confirm']) ? $_GET['confirm'] : null;

if (!$id) {
    die(json_encode(array("message" => "No ID provided.")));
}

if ($confirmation !== "DELETE THIS EMPLOYEE") {
    die(json_encode(array("message" => "Invalid or missing delete confirmation.")));
}

// ลบข้อมูล
$query = "DELETE FROM employees WHERE id=?";
$stmt = $conn->prepare($query);
$stmt->bind_param("i", $id);

if ($stmt->execute()) {
    if ($stmt->affected_rows > 0) {
        echo json_encode(array("message" => "Employee deleted."));
    } else {
        echo json_encode(array("message" => "No employee found with that ID."));
    }
} else {
    echo json_encode(array("message" => "Employee deletion failed: " . $stmt->error));
}

$stmt->close();
$conn->close();
?>
