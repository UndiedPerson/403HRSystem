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

$data = json_decode(file_get_contents("php://input"));

// ตรวจสอบค่าซ้ำแบบแยกแต่ละฟิลด์
$errors = [];

$checkName = $conn->prepare("SELECT id FROM employees WHERE name = ?");
$checkName->bind_param("s", $data->name);
$checkName->execute();
if ($checkName->get_result()->num_rows > 0) {
    $errors[] = "Name already exists.";
}
$checkName->close();

$checkEmail = $conn->prepare("SELECT id FROM employees WHERE email = ?");
$checkEmail->bind_param("s", $data->email);
$checkEmail->execute();
if ($checkEmail->get_result()->num_rows > 0) {
    $errors[] = "Email already exists.";
}
$checkEmail->close();

$checkContact = $conn->prepare("SELECT id FROM employees WHERE contact_number = ?");
$checkContact->bind_param("s", $data->contact_number);
$checkContact->execute();
if ($checkContact->get_result()->num_rows > 0) {
    $errors[] = "Contact number already exists.";
}
$checkContact->close();

if (!empty($errors)) {
    echo json_encode([
        "message" => "Duplicate fields.",
        "errors" => $errors
    ]);
    $conn->close();
    exit;
}

// ถ้าไม่ซ้ำ ให้ทำการ INSERT
$query = "INSERT INTO employees (name, position, branch, hire_date, contact_number, email) VALUES (?, ?, ?, ?, ?, ?)";
$stmt = $conn->prepare($query);

if ($stmt) {
    $stmt->bind_param(
        "ssssss",
        $data->name,
        $data->position,
        $data->branch,
        $data->hire_date,
        $data->contact_number,
        $data->email
    );

    if ($stmt->execute()) {
        echo json_encode(array("message" => "Employee created successfully."));
    } else {
        echo json_encode(array("message" => "Failed to create employee."));
    }
    $stmt->close();
} else {
    echo json_encode(array("message" => "Error preparing statement: " . $conn->error));
}

$conn->close();
