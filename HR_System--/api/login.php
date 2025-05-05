<?php
header('Content-Type: application/json');

// รับข้อมูล JSON ที่ส่งจาก Vue
$data = json_decode(file_get_contents("php://input"));

$username = $data->username;
$password = $data->password;

// ตรวจสอบข้อมูล (จำลองผลโดยไม่ใช้ฐานข้อมูล)
if ($username === 'admin' && $password === 'password') {
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false]);
}
?>
