<template>
    <div class="assessment-review-container">
      <header class="assessment-review-header">
        <h2>ตรวจสอบการประเมิน</h2>
        <button class="assessment-review-back-button" @click="goBackToDashboard">กลับไปที่ Dashboard</button>
      </header>
  
      <div v-if="loading" class="assessment-review-loading">
        กำลังโหลดข้อมูล...
      </div>
  
      <div v-else-if="error" class="assessment-review-error">
        เกิดข้อผิดพลาดในการโหลดข้อมูล: {{ error }}
      </div>
  
      <div v-else class="assessment-review-content">
        <input type="text" v-model="searchQuery" placeholder="ค้นหาพนักงาน" class="assessment-review-search-input">
        <table>
          <thead>
            <tr>
              <th>พนักงาน</th>
              <th>ตำแหน่ง</th>
              <th>รอบประเมิน</th>
              <th>สถานะ</th>
              <th>ตรวจสอบ</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="employee in filteredEmployees" :key="employee.name">
              <td>{{ employee.name }}</td>
              <td>{{ employee.position }}</td>
              <td>{{ employee.period }}</td>
              <td>{{ employee.status }}</td>
              <td>
                <button class="assessment-review-detail-button" @click="goToAssessmentDetail(employee.name)">
                  {{ employee.actionIcon }}
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
  
      <div v-if="selectedEmployee" class="assessment-detail-overlay">
        <div class="assessment-detail-container">
          <h3>ผลการประเมิน - {{ selectedEmployee }}</h3>
          <table>
            <thead>
              <tr>
                <th>หัวข้อประเมิน</th>
                <th>คะแนน (เต็ม 5)</th>
                <th>หมายเหตุ</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(row, index) in assessmentData[selectedEmployee]" :key="index">
                <td>{{ row[0] }}</td>
                <td>{{ row[1] }}</td>
                <td>{{ row[2] }}</td>
              </tr>
            </tbody>
          </table>
          <button class="assessment-detail-close-button" @click="closeAssessmentDetail">ปิด</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        employees: [],
        assessmentData: {},
        loading: true,
        error: null,
        searchQuery: '',
        selectedEmployee: null,
      };
    },
    computed: {
      filteredEmployees() {
        return this.employees.filter(employee =>
          employee.name.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      },
    },
    methods: {
      async fetchAssessmentData() {
        this.loading = true;
        this.error = null;
        try {
          // จำลองการดึงข้อมูลจาก API
          const response = await new Promise((resolve) => {
            setTimeout(() => {
              resolve({
                employees: [
                  { name: "ณัฐพงษ์", position: "Developer", period: "Q3/2025", status: "ส่งแล้ว", actionIcon: "🔍" },
                  { name: "วรรณวิภา", position: "HR Executive", period: "Q3/2025", status: "ยังไม่ส่ง", actionIcon: "🔒" },
                  { name: "ชญานิษฐ์", position: "Designer", period: "Q2/2025", status: "ส่งแล้ว", actionIcon: "🔍" },
                ],
                assessmentData: {
                  "ณัฐพงษ์": [
                    ["ความรับผิดชอบในงาน", 4, 4],
                    ["การทำงานร่วมกับคนอื่น", 5, 5],
                    ["การออกความคิดเห็น", 4, 4],
                    ["ข้อเสนอแนะในการพัฒนา", 4, 4]
                  ],
                  "ชญานิษฐ์": [
                    ["ความรับผิดชอบในงาน", 3, "-"],
                    ["การทำงานร่วมกับคนอื่น", 2, "-"],
                    ["การออกความคิดเห็น", 3, "-"],
                    ["ข้อเสนอแนะในการพัฒนา", 4, "-"]
                  ]
                }
              });
            }, 1000); // จำลองเวลาในการโหลด 1 วินาที
          });
  
          this.employees = response.employees;
          this.assessmentData = response.assessmentData;
        } catch (err) {
          this.error = err;
        } finally {
          this.loading = false;
        }
      },
      goToAssessmentDetail(name) {
        this.selectedEmployee = name;
      },
      closeAssessmentDetail() {
        this.selectedEmployee = null;
      },
      goBackToDashboard() {
        this.$emit('go-back-to-dashboard');
      },
    },
    mounted() {
      this.fetchAssessmentData();
    },
  };
  </script>
  
  <style scoped>
  /* Styles สำหรับ AssessmentReview */
  .assessment-review-container {
    padding: 20px;
    font-family: sans-serif;
    background-color: #f5f5f5;
    min-height: 100vh;
  }
  
  .assessment-review-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    background-color: #9400D3;
    color: white;
    padding: 10px 20px;
    border-radius: 5px;
  }
  
  .assessment-review-header h2 {
    margin: 0;
  }
  
  .assessment-review-back-button {
    background-color: #FFA500;
    color: white;
    border: none;
    padding: 8px 16px;
    border-radius: 5px;
    cursor: pointer;
  }
  
  .assessment-review-loading,
  .assessment-review-error {
    text-align: center;
    margin-top: 20px;
  }
  
  .assessment-review-content {
    margin-top: 20px;
  }
  
  .assessment-review-search-input {
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  
  table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 10px;
  }
  
  th,
  td {
    padding: 12px;
    text-align: left;
    border-bottom: 1px solid #ddd;
  }
  
  th {
    background-color: #f2f2f2;
  }
  
  .assessment-review-detail-button {
    background-color: #4CAF50;
    color: white;
    border: none;
    padding: 5px 10px;
    border-radius: 3px;
    cursor: pointer;
  }
  
  /* Styles สำหรับ Assessment Detail Overlay */
  .assessment-detail-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }
  
  .assessment-detail-container {
    background-color: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    width: 80%;
    max-height: 80%;
    overflow-y: auto;
  }
  
  .assessment-detail-container h3 {
    margin-top: 0;
    border-bottom: 1px solid #ddd;
    padding-bottom: 10px;
  }
  
  .assessment-detail-close-button {
    background-color: #f44336;
    color: white;
    border: none;
    padding: 8px 16px;
    border-radius: 5px;
    cursor: pointer;
    margin-top: 10px;
  }
  </style>