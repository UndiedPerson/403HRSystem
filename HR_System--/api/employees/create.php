<?php
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

if ($data) {
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
            echo json_encode(array("message" => "Employee created.", "id" => $conn->insert_id));
        } else {
            echo json_encode(array("message" => "Employee creation failed: " . $stmt->error));
        }
        $stmt->close();
    } else {
        echo json_encode(array("message" => "Error preparing statement: " . $conn->error));
    }
} else {
    echo json_encode(array("message" => "No data received to create employee."));
}

$conn->close();
?>