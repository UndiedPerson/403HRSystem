<template>
    <div class="salary-management-container">
      <!-- Header -->
      <header class="page-header">
        <button @click="goToDashboard" class="btn-back">← กลับไป Dashboard</button>
        <h2>จัดการเงินเดือนพนักงาน</h2>
      </header>

      <div class="table-wrapper">
        <table class="salary-table">
          <thead>
            <tr>
              <th>รหัสพนักงาน</th>
              <th>ชื่อพนักงาน</th>
              <th>เงินเดือน (บาท)</th>
              <th>แก้ไข</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(employee, index) in employees" :key="employee.id">
              <td>{{ employee.id }}</td>
              <td>{{ employee.name }}</td>
              <td>
                <div v-if="editIndex === index">
              <input
                v-model="editedSalary"
                type="text"
                class="salary-input"
                @input="onSalaryInput"
                />

                </div>
                <div v-else>
                  {{ employee.salary.toLocaleString() }}
                </div>
              </td>
              <td>
                <button
                  v-if="editIndex !== index"
                  @click="startEdit(index)"
                  class="btn-edit"
                >
                  edit
                </button>
                <button
                  v-else
                  @click="saveEdit(index)"
                  class="btn-save"
                >
                  save
                </button>
                <button
                  v-if="editIndex === index"
                  @click="cancelEdit"
                  class="btn-cancel"
                >
                  cancel
                </button>
              </td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td colspan="2" style="text-align: right; font-weight: bold;">
                เงินเดือนรวม
              </td>
              <td colspan="2" style="font-weight: bold;">
                {{ totalSalary.toLocaleString() }} บาท
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
  
      <button @click="printPdf" class="print-button">Print Table (PDF)</button>
    </div>
  </template>
  
  <script>
  import { jsPDF } from "jspdf";
  import axios from "axios";
  
  export default {
    data() {
      return {
        employees: [],
        editIndex: null,
        editedSalary: null,
      };
    },
    computed: {
      totalSalary() {
        return this.employees.reduce((sum, emp) => {
          const salaryNum = parseFloat(emp.salary);
          return sum + (isNaN(salaryNum) ? 0 : salaryNum);
        }, 0);
      },
    },
    methods: {
      async fetchSalaries() {
        try {
          const res = await axios.get(
            "http://127.0.0.1/HrSystem_project/Human-Resource-Management-System_System_Analysis_and_Design_Project/HR_System--/api/salaries/get_all_salaries.php"
          );
          this.employees = res.data;
        } catch (err) {
          console.error("โหลดข้อมูลเงินเดือนไม่สำเร็จ", err);
        }
      },
      startEdit(index) {
        this.editIndex = index;
        this.editedSalary = this.employees[index].salary;
      },
      async saveEdit(index) {
        const emp = this.employees[index];
        if (this.editedSalary !== null && this.editedSalary >= 0) {
          try {
            await axios.post(
              "http://127.0.0.1/HrSystem_project/Human-Resource-Management-System_System_Analysis_and_Design_Project/HR_System--/api/salaries/update_salary.php",
              {
                id: emp.id,
                salary: this.editedSalary,
              }
            );
            emp.salary = this.editedSalary;
            this.editIndex = null;
            this.editedSalary = null;
          } catch (err) {
            console.error("อัปเดตเงินเดือนไม่สำเร็จ", err);
          }
        }
      },
      cancelEdit() {
        this.editIndex = null;
        this.editedSalary = null;
      },
      printPdf() {
        const doc = new jsPDF();
        doc.setFontSize(16);
        doc.text("รายงานเงินเดือนพนักงาน", 14, 20);
        let y = 30;
  
        doc.setFontSize(12);
        doc.text("รหัสพนักงาน", 14, y);
        doc.text("ชื่อพนักงาน", 60, y);
        doc.text("เงินเดือน (บาท)", 140, y);
        y += 8;
  
        this.employees.forEach((emp) => {
          doc.text(emp.id.toString(), 14, y);
          doc.text(emp.name, 60, y);
          doc.text(emp.salary.toLocaleString(), 140, y, { align: "right" });
          y += 8;
        });
  
        y += 10;
        doc.setFontSize(14);
        doc.text(`เงินเดือนรวมทั้งหมด: ${this.totalSalary.toLocaleString()} บาท`, 14, y);
        doc.save("salary-report.pdf");
      },
      goToDashboard() {
        this.$router.push('/dashboard');
      }
    },
    mounted() {
      this.fetchSalaries();
    },
  };
  </script>
  
  
  <style scoped>
  .salary-management-container {
    padding: 20px;
    font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
    display: flex;
    flex-direction: column;
    align-items: center; /* จัดกึ่งกลาง */
  }
  
  .table-wrapper {
    max-width: 700px;
    width: 100%;
    overflow-x: auto; /* ให้เลื่อนซ้ายขวาได้ถ้าข้อมูลล้น */
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    margin-bottom: 20px;
  }
  
  .salary-table {
    width: 100%;
    border-collapse: collapse;
    min-width: 600px; /* กำหนดความกว้างขั้นต่ำ */
  }
  
  .salary-table th,
  .salary-table td {
    border: 1px solid #ddd;
    padding: 10px;
    text-align: left;
  }
  
  .salary-table thead {
    background-color: #840cfe;
    color: white;
  }
  
  .salary-table tbody tr:nth-child(even) {
    background-color: #f9f9f9;
  }
  
  .salary-input {
    width: 100px;
    padding: 5px;
    font-size: 14px;
    border: 1px solid #840cfe;
    border-radius: 4px;
    outline-color: #840cfe;
  }
  
  .print-button {
    background-color: #f4c542;
    border: none;
    padding: 10px 20px;
    font-weight: bold;
    border-radius: 6px;
    cursor: pointer;
    color: black;
    align-self: flex-end; /* จัดปุ่มชิดขวา */
    transition: background-color 0.3s ease;
  }
  
  .print-button:hover {
    background-color: #e0b900;
  }
  
  /* ปุ่มแก้ไขสีฟ้า */
  .btn-edit {
    background-color: #007bff;
    color: white;
    border: none;
    padding: 6px 12px;
    font-weight: 600;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  .btn-edit:hover {
    background-color: #0056b3;
  }
  
  /* ปุ่มบันทึกสีเขียว */
  .btn-save {
    background-color: #28a745;
    color: white;
    border: none;
    padding: 6px 12px;
    font-weight: 600;
    border-radius: 5px;
    cursor: pointer;
    margin-right: 6px;
    transition: background-color 0.3s ease;
  }
  
  .btn-save:hover {
    background-color: #1e7e34;
  }
  
  /* ปุ่มยกเลิกสีแดง */
  .btn-cancel {
    background-color: #dc3545;
    color: white;
    border: none;
    padding: 6px 12px;
    font-weight: 600;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  .btn-cancel:hover {
    background-color: #a71d2a;
  }
  .dashboard-button {
  position: absolute;
  top: 50%;
  right: 20px;
  transform: translateY(-50%);
  background-color: #f4c542; /* สีเหลือง */
  color: black;
  border: none;
  padding: 8px 14px;
  font-weight: bold;
  border-radius: 4px;
  cursor: pointer;
  transition: opacity 0.2s ease;
}
  </style>
  