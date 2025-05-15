<?php
header('Content-Type: application/json');

// เชื่อมต่อฐานข้อมูล MySQL
$host = 'localhost';
$dbname = 'hr_management_db';
$username = 'root';
$password = '';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // ดึงข้อมูลพนักงาน + รอบประเมิน + สถานะ
    // สมมติข้อมูลมาจากตาราง assessments และ employees
    $stmt = $pdo->prepare("
        SELECT e.id, e.name, e.position, a.period, a.status
        FROM assessments a
        JOIN employees e ON a.employee_id = e.id
        ORDER BY e.name
    ");
    $stmt->execute();
    $employeesRaw = $stmt->fetchAll(PDO::FETCH_ASSOC);

    $employees = [];
    foreach ($employeesRaw as $row) {
        $employees[] = [
            'id' => $row['id'],
            'name' => $row['name'],
            'position' => $row['position'],
            'period' => $row['period'],
            'status' => $row['status'],
        ];
    }

    // ดึงข้อมูลคะแนนและหมายเหตุสำหรับแต่ละพนักงาน
    $stmt2 = $pdo->prepare("
        SELECT a.employee_id, c.criteria_name, ad.score, ad.note
        FROM assessment_details ad
        JOIN criteria c ON ad.criteria_id = c.id
        JOIN assessments a ON ad.assessment_id = a.id
        ORDER BY a.employee_id, c.criteria_name
    ");
    $stmt2->execute();
    $detailsRaw = $stmt2->fetchAll(PDO::FETCH_ASSOC);

    // จัดกลุ่มข้อมูล assessmentData ตามชื่อพนักงาน
    $assessmentData = [];
    // สร้าง map จาก employee_id ไปหา employee name เพื่อเอาชื่อเป็น key
    $employeeIdToName = [];
    foreach ($employees as $emp) {
        $employeeIdToName[$emp['id']] = $emp['name'];
    }

    foreach ($detailsRaw as $detail) {
        $name = $employeeIdToName[$detail['employee_id']];
        if (!isset($assessmentData[$name])) {
            $assessmentData[$name] = [];
        }
        $assessmentData[$name][] = [
            'criteria' => $detail['criteria_name'],
            'score' => (int)$detail['score'],
            'note' => $detail['note'],
        ];
    }

    echo json_encode([
        'employees' => $employees,
        'assessmentData' => $assessmentData,
    ]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Database error: ' . $e->getMessage()]);
}
