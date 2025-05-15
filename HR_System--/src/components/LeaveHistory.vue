<template>
  <div class="leave-history-container">
    <div class="header" :style="{ backgroundColor: theme.headerBackground, color: theme.headerTextColor, position: 'relative' }">
      <h2>ประวัติการลาที่อนุมัติแล้ว</h2>
      <button @click="goToDashboard" class="dashboard-button">Dashboard</button>
    </div>

    <div class="navigation-tabs">
      <router-link to="/employees">
        <button class="nav-tab">พนักงาน</button>
      </router-link>
      <button class="nav-tab active">ประวัติการลา</button>
      <button class="nav-tab">รายงาน</button>
    </div>

    <div v-if="loading">กำลังโหลดข้อมูล...</div>
    <div v-if="error" class="error">{{ error }}</div>

    <div v-if="approvedLeaves.length === 0 && !loading" class="no-results">
      ไม่มีประวัติการลาที่อนุมัติแล้ว
    </div>

    <table v-else class="leave-table">
      <thead>
        <tr>
          <th>ลำดับการลา</th>
          <th>ชื่อพนักงาน</th>
          <th>ประเภทการลา</th>
          <th>วันที่</th>
          <th>เหตุผล</th>
          <th>สถานะ</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="leave in approvedLeaves" :key="leave.LeaveID">
          <td>{{ leave.LeaveID }}</td>
          <td>{{ leave.name }}</td>
          <td>{{ leave.leave_type }}</td>
          <td>{{ leave.start_date }} ถึง {{ leave.end_date }}</td>
          <td>{{ leave.reason }}</td>
          <td class="status-approved">approved</td>
        </tr>
      </tbody>
    </table>
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
    goToDashboard() {
      this.$router.push('/dashboard');
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
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}

.header {
  padding: 16px;
  font-size: 24px;
  text-align: center;
  margin-bottom: 20px;
  border-radius: 8px 8px 0 0;
  position: relative;
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

.leave-table {
  width: 100%;
  border-collapse: collapse;
  box-shadow: 0 0 10px #ccc;
}

.leave-table th,
.leave-table td {
  border: 1px solid #ddd;
  padding: 10px;
  text-align: left;
}

.leave-table thead {
  background-color: #840cfe;
  color: white;
}

.leave-table tbody tr:nth-child(even) {
  background-color: #f9f9f9;
}

.status-approved {
  color: green;
  font-weight: bold;
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

.dashboard-button:hover {
  opacity: 0.8;
}
</style>
