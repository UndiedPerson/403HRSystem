<template>
    <div class="salary-management-container">
      <!-- Header -->
      <header class="page-header">
        <button @click="goToDashboard" class="btn-back">Dashboard</button>
        <h2>จัดการเงินเดือนพนักงาน</h2>
      </header>
  
      <div class="table-wrapper">
        <table class="salary-table">
          <thead>
            <tr>
              <th>รหัสพนักงาน</th>
              <th>ชื่อพนักงาน</th>
              <th>ตำแหน่ง</th>
              <th>เงินเดือน (บาท)</th>
              <th>แก้ไข</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(employee, index) in employees" :key="employee.id">
              <td>{{ employee.id }}</td>
              <td>{{ employee.name }}</td>
              <td>{{ employee.position }}</td>
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
                  {{ Number(employee.salary).toLocaleString() }}
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
      onSalaryInput(e) {
        // Optional: allow only numbers (and maybe decimals)
        const val = e.target.value.replace(/[^\d.]/g, "");
        this.editedSalary = val;
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
          doc.text(Number(emp.salary).toLocaleString(), 140, y, { align: "right" });
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
    max-width: 700px;  /* กำหนดความกว้าง max เท่ากับ header */
    margin: 0 auto;    /* จัดกลางหน้า */
    padding: 20px;
    font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  }
  
  .page-header {
    padding: 16px;
    font-size: 24px;
    text-align: center;
    margin-bottom: 20px;
    border-radius: 8px 8px 0 0;
    background-color: #840cfe;
    color: white;
    position: relative;
    width: 100%;
    box-sizing: border-box;
  }
  
  .btn-back {
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
  
  .btn-back:hover {
    opacity: 0.8;
  }
  
  .table-wrapper {
    width: 100%;           /* เต็ม container */
    overflow-x: auto;      /* เลื่อนแนวนอนถ้าเนื้อหากว้าง */
    box-shadow: 0 0 10px #ccc;
    border-radius: 8px;
    margin-bottom: 20px;
  }
  
  .salary-table {
    width: 100%;
    min-width: 600px;      /* ความกว้างขั้นต่ำของตาราง เพื่อไม่ให้บีบจนข้อมูลล้น */
    border-collapse: collapse;
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
    align-self: flex-end;
    transition: background-color 0.3s ease;
    margin-left: auto;
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
  </style>
  