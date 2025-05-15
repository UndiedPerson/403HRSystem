<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");


include '../config/database.php';

$conn = new mysqli($host, $user, $pass, $dbname);
// ถ้าเป็น preflight OPTIONS request ให้ตอบ 200 OK ทันที แล้ว exit
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}
if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode(["error" => "Connection failed: " . $conn->connect_error]);
    exit;
}

// รับข้อมูล JSON ที่ส่งมาจาก client
$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data['id']) || !isset($data['salary'])) {
    http_response_code(400);
    echo json_encode(["error" => "Missing id or salary"]);
    exit;
}

$id = intval($data['id']);
$salary = floatval($data['salary']);

// ตรวจสอบข้อมูลก่อนอัปเดต (optional)
if ($salary < 0) {
    http_response_code(400);
    echo json_encode(["error" => "Salary must be non-negative"]);
    exit;
}

// อัปเดตเงินเดือนในฐานข้อมูล
$sql = "UPDATE salaries SET salary = ? WHERE id = ?";

$stmt = $conn->prepare($sql);
if (!$stmt) {
    http_response_code(500);
    echo json_encode(["error" => "Prepare failed: " . $conn->error]);
    exit;
}

$stmt->bind_param("di", $salary, $id);

if ($stmt->execute()) {
    echo json_encode(["message" => "Salary updated successfully"]);
} else {
    http_response_code(500);
    echo json_encode(["error" => "Update failed: " . $stmt->error]);
}

$stmt->close();
$conn->close();
?>
