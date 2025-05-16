<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: application/json');

include '../config/database.php';

$conn = new mysqli($host, $user, $pass, $dbname);

// ตรวจสอบการเชื่อมต่อ
if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode(["error" => "Connection failed: " . $conn->connect_error]);
    exit;
}

// ดึงข้อมูลเงินเดือนร่วมกับชื่อพนักงาน และตำแหน่ง
$sql = "SELECT salaries.id, employees.name, employees.position, salaries.salary
        FROM salaries
        JOIN employees ON salaries.id = employees.id";

$stmt = $conn->prepare($sql);
$stmt->execute();
$result = $stmt->get_result();

$salaries = [];
while ($row = $result->fetch_assoc()) {
    $salaries[] = $row;
}

echo json_encode($salaries);
