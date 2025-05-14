<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

header('Content-Type: application/json');
include '../config/database.php';

// Connect DB
$conn = new mysqli($host, $user, $pass, $dbname);
if ($conn->connect_error) {
    echo json_encode(["success" => false, "message" => "Connection failed: " . $conn->connect_error]);
    exit;
}

// รับข้อมูล JSON ที่ส่งเข้ามา
$data = json_decode(file_get_contents("php://input"), true);

// ตรวจสอบ id
if (!isset($data['id']) || empty($data['id'])) {
    echo json_encode(["success" => false, "message" => "Missing employee id."]);
    exit;
}

$id = intval($data['id']); // แปลงให้ชัดเจนว่าเป็น integer

// ตรวจสอบคำยืนยันการลบ
if (!isset($data['confirm']) || $data['confirm'] !== 'DELETE THIS EMPLOYEE') {
    echo json_encode(["success" => false, "message" => 'กรุณาพิมพ์ "DELETE THIS EMPLOYEE" เพื่อยืนยันการลบ']);
    exit;
}

// เช็คก่อนว่ามีพนักงานที่มี id นี้อยู่จริงหรือไม่
$checkEmployee = $conn->prepare("SELECT id FROM employees WHERE id = ?");
$checkEmployee->bind_param("i", $id);
$checkEmployee->execute();
$result = $checkEmployee->get_result();
if ($result->num_rows === 0) {
    echo json_encode(["success" => false, "message" => "No employee found with that ID."]);
    exit;
}
$checkEmployee->close();

// ถ้าเจอพนักงาน ให้ทำการลบ
$query = "DELETE FROM employees WHERE id = ?";
$stmt = $conn->prepare($query);

if (!$stmt) {
    echo json_encode(["success" => false, "message" => "Failed to prepare statement: " . $conn->error]);
    exit;
}

$stmt->bind_param("i", $id);

// Execute
if ($stmt->execute()) {
    if ($stmt->affected_rows > 0) {
        echo json_encode(["success" => true, "message" => "Employee deleted.", "id" => $id]);
    } else {
        echo json_encode(["success" => false, "message" => "No employee found with that ID.", "id" => $id]);
    }
} else {
    echo json_encode(["success" => false, "message" => "Execute failed: " . $stmt->error, "id" => $id]);
}

// Close
$stmt->close();
$conn->close();
?>
