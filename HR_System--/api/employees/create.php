<?php
// รวมไฟล์ config ที่เก็บการเชื่อมต่อกับฐานข้อมูล
include '../config/database.php';

// ตั้งค่า header เพื่อรองรับ CORS (ถ้าจำเป็น)
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// ตรวจสอบการเชื่อมต่อกับฐานข้อมูล
$conn = new mysqli($host, $user, $pass, $dbname);
if ($conn->connect_error) {
    die(json_encode(array("message" => "Connection failed: " . $conn->connect_error)));
}

// ตรวจสอบว่า POST request มีข้อมูลหรือไม่
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // ตรวจสอบว่าได้ข้อมูลจากฟอร์ม
    if (isset($_POST['name']) && isset($_POST['position']) && isset($_POST['branch']) &&
        isset($_POST['hire_date']) && isset($_POST['contact_number']) && isset($_POST['email'])) {

        // รับข้อมูลจากฟอร์ม
        $name = $conn->real_escape_string($_POST['name']);
        $position = $conn->real_escape_string($_POST['position']);
        $branch = $conn->real_escape_string($_POST['branch']);
        $hire_date = $conn->real_escape_string($_POST['hire_date']);
        $contact_number = $conn->real_escape_string($_POST['contact_number']);
        $email = $conn->real_escape_string($_POST['email']);

        // การจัดการรูปภาพ
        $imagePath = null;
        if (isset($_FILES['image']) && $_FILES['image']['error'] == 0) {
            $imageName = basename($_FILES['image']['name']);
            $imagePath = 'uploads/' . $imageName;  // สามารถเปลี่ยนที่เก็บไฟล์ได้
            move_uploaded_file($_FILES['image']['tmp_name'], $imagePath);
        }

        // SQL query สำหรับการแทรกข้อมูล
        $query = "INSERT INTO employees (name, position, branch, hire_date, contact_number, email, image_path) 
                  VALUES ('$name', '$position', '$branch', '$hire_date', '$contact_number', '$email', '$imagePath')";

        // Execute query
        if ($conn->query($query) === TRUE) {
            // ส่งข้อมูลกลับไปให้ frontend
            echo json_encode(array("message" => "Employee created.", "id" => $conn->insert_id));
        } else {
            echo json_encode(array("message" => "Error: " . $conn->error));
        }
    } else {
        echo json_encode(array("message" => "Missing required fields"));
    }
} else {
    echo json_encode(array("message" => "Invalid request method"));
}

// ปิดการเชื่อมต่อฐานข้อมูล
$conn->close();
?>
