<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

header('Content-Type: application/json');
include '../config/database.php';

$conn = new mysqli($host, $user, $pass, $dbname);
if ($conn->connect_error) {
    die(json_encode(["message" => "Connection failed: " . $conn->connect_error]));
}

// ดึงข้อมูลทั้งหมดที่มีสถานะ 'อนุมัติ' พร้อมกับชื่อพนักงาน
$query = "SELECT lh.LeaveID, lh.id AS id, lh.leave_type,e.name AS name, lh.start_date, lh.end_date, lh.reason, lh.status 
          FROM leave_history lh
          JOIN employees e ON lh.id = e.id  /* join กับตาราง employees ตาม id พนักงาน */
          WHERE lh.status = 'approved' 
          ORDER BY lh.LeaveID DESC";

$result = $conn->query($query);
$leaveHistory = [];

if ($result && $result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $leaveHistory[] = $row;
    }
}

echo json_encode($leaveHistory);

$conn->close();
?>
