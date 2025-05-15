<?php
session_start();  // เริ่ม session

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    
    $username = $data['username'] ?? '';
    $password = $data['password'] ?? '';

    if ($username === 'admin' && $password === '1234') {
        // เก็บ username ไว้ใน session
        $_SESSION['username'] = $username;

        echo json_encode(['success' => true, 'username' => $username]);
    } else {
        echo json_encode(['success' => false, 'message' => 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
}
