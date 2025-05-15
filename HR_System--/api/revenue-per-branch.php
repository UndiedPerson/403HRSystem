<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

// กำหนดค่าตามฐานข้อมูลคุณ
$host = "localhost";          // หรือ IP ของ database server
$user = "root";       // ชื่อผู้ใช้ฐานข้อมูล
$pass = "1234";   // รหัสผ่านฐานข้อมูล
$dbname = "hr_management_db";     // ชื่อฐานข้อมูล

$conn = new mysqli($host, $user, $pass, $dbname);

if ($conn->connect_error) {
  http_response_code(500);
  echo json_encode(["error" => "Database connection failed: " . $conn->connect_error]);
  exit();
}

$sql = "SELECT branch_name AS branch, revenue FROM branches_revenue";
$result = $conn->query($sql);

if (!$result) {
  http_response_code(500);
  echo json_encode(["error" => "Query failed: " . $conn->error]);
  $conn->close();
  exit();
}

$revenues = [];

while ($row = $result->fetch_assoc()) {
  $row['revenue'] = floatval($row['revenue']);
  $revenues[] = $row;
}

echo json_encode($revenues);

$conn->close();
