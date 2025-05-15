<?php
// Allow CORS
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// ✅ ตอบกลับทันทีถ้าเป็น OPTIONS (preflight)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

include '../config/database.php';

// รับ JSON
$rawInput = file_get_contents("php://input");
$data = json_decode($rawInput);

// ตรวจสอบข้อมูล
if (!isset($data->LeaveID) || !in_array($data->status, ['approved', 'declined'])) {
    http_response_code(400);
    echo json_encode(["message" => "Invalid request"]);
    exit;
}

$conn = new mysqli($host, $user, $pass, $dbname);
if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode(["message" => "Connection failed: " . $conn->connect_error]);
    exit;
}

// ตรวจสอบว่าสถานะเป็น waiting ก่อน
$check = $conn->prepare("SELECT status FROM leave_history WHERE LeaveID = ?");
$check->bind_param("i", $data->LeaveID);
$check->execute();
$result = $check->get_result();
$existing = $result->fetch_assoc();

if (!$existing || $existing['status'] !== 'waiting') {
    echo json_encode(["message" => "Can only update status from 'waiting'"]);
    exit;
}

// อัปเดตสถานะ
$stmt = $conn->prepare("UPDATE leave_history SET status = ? WHERE LeaveID = ?");
$stmt->bind_param("si", $data->status, $data->LeaveID);

if ($stmt->execute()) {
    echo json_encode(["message" => "Status updated successfully"]);
} else {
    http_response_code(500);
    echo json_encode(["message" => "Failed to update status"]);
}

$conn->close();
?>
