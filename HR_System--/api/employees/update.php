<?php
header('Content-Type: application/json');
include '../../config/database.php';

$conn = new mysqli($host, $user, $pass, $dbname);
if ($conn->connect_error) {
    die(json_encode(array("message" => "Connection failed: " . $conn->connect_error)));
}

$data = json_decode(file_get_contents("php://input"));

if ($data && isset($_GET['id'])) {
    $id = $_GET['id'];
    // **TODO: VALIDATE INPUTS HERE! (Security)**
    $query = "UPDATE employees SET name=?, position=?, department=?, hire_date=?, contact_number=?, email=? WHERE id=?";
    $stmt = $conn->prepare($query);

    if ($stmt) {
        $stmt->bind_param(
            "ssssssi",
            $data->name,
            $data->position,
            $data->department,
            $data->hire_date,
            $data->contact_number,
            $data->email,
            $id
        );

        if ($stmt->execute()) {
            if ($stmt->affected_rows > 0) {
                echo json_encode(array("message" => "Employee updated."));
            } else {
                echo json_encode(array("message" => "No employee found with that ID."));
            }
        } else {
            echo json_encode(array("message" => "Employee update failed: " . $stmt->error));
        }
        $stmt->close();
    } else {
        echo json_encode(array("message" => "Error preparing statement: " . $conn->error));
    }
} else {
    echo json_encode(array("message" => "No data or ID received to update employee."));
}

$conn->close();
?>