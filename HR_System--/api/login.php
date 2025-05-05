<?php
// เช็คว่า request เป็น POST หรือไม่
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // รับข้อมูลที่ส่งมาจาก Vue
    $data = json_decode(file_get_contents('php://input'), true);
    
    // ตรวจสอบข้อมูลที่รับมา
    $username = $data['username'] ?? '';
    $password = $data['password'] ?? '';

    // สมมุติว่าเรามี username = 'admin' และ password = '1234' สำหรับการทดสอบ
    if ($username === 'admin' && $password === '1234') {
        // ส่งผลลัพธ์ JSON กลับไป
        echo json_encode(['success' => true]);
    } else {
        // ถ้า username หรือ password ผิด
        echo json_encode(['success' => false]);
    }
} else {
    echo json_encode(['success' => false]);
}
?>
