<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type");

header('Content-Type: application/json');
include '../config/database.php';

$conn = new mysqli($host, $user, $pass, $dbname);
if ($conn->connect_error) {
    die(json_encode(["message" => "Connection failed: " . $conn->connect_error]));
}

$query = "SELECT lh.LeaveID, lh.id, e.name, lh.leave_type, lh.start_date, lh.end_date, lh.reason, lh.status 
          FROM leave_history lh
          JOIN employees e ON lh.id = e.id
          ORDER BY lh.LeaveID DESC";

$result = $conn->query($query);
$leaveRequests = [];

if ($result && $result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $leaveRequests[] = $row;
    }
}

echo json_encode($leaveRequests);
$conn->close();
