<template>
  <div class="leave-history-container">
    <div class="header" :style="{ backgroundColor: theme.headerBackground, color: theme.headerTextColor }">
      <h2>ประวัติการลาที่อนุมัติแล้ว</h2>
    </div>
    <div class="navigation-tabs">
      <router-link to="/employees">
      <button class="nav-tab ">พนักงาน</button>
    </router-link>
      <button class="nav-tab active">ประวัติการลา</button>

      <button class="nav-tab">รายงาน</button>
    </div>
    <div v-if="loading">กำลังโหลดข้อมูล...</div>
    <div v-if="error" class="error">{{ error }}</div>

    <div v-if="approvedLeaves.length === 0 && !loading" class="no-results">
      ไม่มีประวัติการลาที่อนุมัติแล้ว
    </div>

    <ul v-else class="leave-list">
      <li v-for="leave in approvedLeaves" :key="leave.LeaveID" class="leave-card" :style="{ borderColor: theme.cardBorderColor }">
        <p><strong>ลำดับการลาที่:</strong> {{ leave.LeaveID }}</p>
        <p><strong>รหัสพนักงาน:</strong> {{ leave.id }}</p>
        <p><strong>ชื่อพนักงาน:</strong> {{ leave.name }}</p>
        <p><strong>ประเภทการลา:</strong> {{ leave.leave_type }}</p>
        <p><strong>วันที่:</strong> {{ leave.start_date }} ถึง {{ leave.end_date }}</p>
        <p><strong>เหตุผล:</strong> {{ leave.reason }}</p>
        <p class="status" :style="{ color: 'green', fontWeight: 'bold' }">สถานะ: {{ leave.status }}</p>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';

const API_URL = 'http://127.0.0.1/HrSystem_project/Human-Resource-Management-System_System_Analysis_and_Design_Project/HR_System--/api/leave_request/get_leave_history.php'; 

export default {
  name: 'LeaveHistory',
  props: {
    theme: {
      type: Object,
      default: () => ({
        headerBackground: '#840CFE',
        headerTextColor: 'white',
        cardBorderColor: '#CCCCCC',
      }),
    },
  },
  data() {
    return {
      approvedLeaves: [],
      loading: false,
      error: null,
    };
  },
  methods: {
    async fetchApprovedLeaves() {
      this.loading = true;
      this.error = null;

      try {
        const response = await axios.get(API_URL);
        this.approvedLeaves = response.data.filter(leave => leave.status === 'approved');
      } catch (err) {
        console.error('Error fetching leave data:', err);
        this.error = 'ไม่สามารถโหลดประวัติการลาได้';
      } finally {
        this.loading = false;
      }
    },
  },
  mounted() {
    this.fetchApprovedLeaves();
  },
};
</script>

<style scoped>
.leave-history-container {
  padding: 20px;
}

.header {
  padding: 16px;
  font-size: 24px;
  text-align: center;
  margin-bottom: 20px;
  border-radius: 8px 8px 0 0;
}

.leave-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  list-style: none;
  gap: 16px;
}

.leave-card {
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 16px;
  background-color: #fafafa;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
}

.no-results {
  text-align: center;
  color: #888;
  font-style: italic;
  margin-top: 20px;
}

.error {
  color: red;
  margin-bottom: 10px;
}
.search-input {
  width: 300px;
}
.employee-list-container {
  padding: 20px;
}
.header {
  padding: 16px;
  font-size: 24px;
  text-align: center;
  margin-bottom: 20px;
  border-radius: 8px 8px 0 0;
}
.navigation-tabs {
  display: flex;
  margin-bottom: 20px;
}
.nav-tab {
  padding: 10px 20px;
  border: none;
  background-color: #f0f0f0;
  color: #333;
  cursor: pointer;
  margin-right: 10px;
  border-radius: 5px 5px 0 0;
}
.nav-tab.active {
  background-color: #840cfe;
  color: white;
}
.list-controls {
  display: flex;
  gap: 10px;
  align-items: center;
  margin-bottom: 20px;
}
.list-controls input[type='text'] {
  width: 200px;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
}
.list-controls button {
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
}
.employee-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}
.employee-card {
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}
.employee-avatar {
  margin-bottom: 10px;
}
.employee-details {
  margin-bottom: 10px;
}
.employee-name {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 5px;
}
.employee-position,
.employee-email,
.employee-status {
  font-size: 14px;
  color: #666;
  margin-bottom: 5px;
}
.employee-actions {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 10px;
}
.employee-actions button {
  padding: 8px 12px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
}
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}
.modal-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 300px;
}
.modal-header {
  margin-bottom: 10px;
}
.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 15px;
}
.confirm-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
.invalid-input {
  border: 1px solid red;
  background-color: #ffe5e5;
  padding: 8px;
  width: 100%;
  margin-top: 10px;
}
.error-text {
  color: red;
  font-size: 14px;
  margin-top: 5px;
}
.no-results {
  text-align: center;
  color: #888;
  font-style: italic;
  margin-top: 20px;
}
</style>
