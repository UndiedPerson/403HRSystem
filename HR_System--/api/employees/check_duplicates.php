<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

header('Content-Type: application/json');
include '../config/database.php';

$conn = new mysqli($host, $user, $pass, $dbname);
if ($conn->connect_error) {
    die(json_encode(array("message" => "Connection failed: " . $conn->connect_error)));
}

// รับข้อมูลจาก request body
$data = json_decode(file_get_contents("php://input"));

// ตรวจสอบว่าข้อมูลครบหรือไม่
if (!isset($data->id, $data->email, $data->name, $data->contact_number)) {
    echo json_encode(array("error" => "Missing required fields"));
    exit;
}

// ตรวจสอบการซ้ำในฐานข้อมูล โดยยกเว้น id ปัจจุบัน
$checkQuery = "SELECT id FROM employees WHERE (email = ? OR name = ? OR contact_number = ?) AND id != ?";
$stmt = $conn->prepare($checkQuery);
$stmt->bind_param("sssi", $data->email, $data->name, $data->contact_number, $data->id);
$stmt->execute();
$result = $stmt->get_result();

// ถ้ามีข้อมูลซ้ำในฐานข้อมูล (ยกเว้นตัวเอง)
if ($result->num_rows > 0) {
    echo json_encode(array("isDuplicate" => true));
} else {
    echo json_encode(array("isDuplicate" => false));
}

$stmt->close();
$conn->close();
?>
