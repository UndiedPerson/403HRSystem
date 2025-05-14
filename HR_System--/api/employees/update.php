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

// รับข้อมูลจาก JSON
$data = json_decode(file_get_contents("php://input"), true);

// ตรวจสอบว่ามีข้อมูลที่ต้องการหรือไม่
if (isset($data['id'])) {

    // รับข้อมูลจาก JSON
    $id = $conn->real_escape_string($data['id']);
    $name = isset($data['name']) ? $conn->real_escape_string($data['name']) : null;
    $position = isset($data['position']) ? $conn->real_escape_string($data['position']) : null;
    $branch = isset($data['branch']) ? $conn->real_escape_string($data['branch']) : null;
    $hire_date = isset($data['hire_date']) ? $conn->real_escape_string($data['hire_date']) : null;
    $contact_number = isset($data['contact_number']) ? $conn->real_escape_string($data['contact_number']) : null;
    $email = isset($data['email']) ? $conn->real_escape_string($data['email']) : null;

    // การจัดการรูปภาพ
    $imagePath = null;
    if (isset($_FILES['image']) && $_FILES['image']['error'] == 0) {
        // การอัปโหลดไฟล์
        $imageName = basename($_FILES['image']['name']);
        $imagePath = 'uploads/' . $imageName;  // สามารถเปลี่ยนที่เก็บไฟล์ได้
        move_uploaded_file($_FILES['image']['tmp_name'], $imagePath);
    }

    // SQL query เพื่อดึงข้อมูลเดิมจากฐานข้อมูลก่อน
    $query = "SELECT * FROM employees WHERE id='$id'";
    $result = $conn->query($query);
    
    if ($result->num_rows > 0) {
        $existingData = $result->fetch_assoc();

        // หากไม่ได้รับข้อมูลใหม่จาก JSON ใช้ค่าที่มีอยู่เดิม
        $name = $name ? $name : $existingData['name'];
        $position = $position ? $position : $existingData['position'];
        $branch = $branch ? $branch : $existingData['branch'];
        $hire_date = $hire_date ? $hire_date : $existingData['hire_date'];
        $contact_number = $contact_number ? $contact_number : $existingData['contact_number'];
        $email = $email ? $email : $existingData['email'];
        $imagePath = $imagePath ? $imagePath : $existingData['image_path'];

        // SQL query สำหรับการอัปเดตข้อมูล
        $updateQuery = "UPDATE employees 
                        SET name='$name', position='$position', branch='$branch', hire_date='$hire_date', 
                            contact_number='$contact_number', email='$email'";

        // ถ้ามีการอัปโหลดไฟล์ภาพ จะอัปเดต image_path
        if ($imagePath) {
            $updateQuery .= ", image_path='$imagePath'";
        }

        // เพิ่มเงื่อนไข WHERE สำหรับการเลือกพนักงานที่ต้องการอัปเดต
        $updateQuery .= " WHERE id='$id'";

        // Execute query
        if ($conn->query($updateQuery) === TRUE) {
            echo json_encode(array("message" => "Employee updated."));
        } else {
            echo json_encode(array("message" => "Error: " . $conn->error));
        }
    } else {
        echo json_encode(array("message" => "Employee not found"));
    }
} else {
    echo json_encode(array("message" => "Missing required fields"));
}

// ปิดการเชื่อมต่อฐานข้อมูล
$conn->close();
?>
