<template>
  <div class="approval-request-container">
    <h2>
      คำขออนุมัติการลา
      <button @click="goToDashboard" class="dashboard-button">Dashboard</button>
    </h2>

    <div v-if="loading" class="loading">กำลังโหลด...</div>
    <div v-if="error" class="error">{{ error }}</div>
    <div v-if="message" class="message">{{ message }}</div>

    <table v-if="requests.length > 0" class="leave-table">
      <thead>
        <tr>
          <th>ลำดับคำขอลา</th>
          <th>ชื่อพนักงาน (ID)</th>
          <th>ประเภทการลา</th>
          <th>วันที่</th>
          <th>เหตุผล</th>
          <th>สถานะ</th>
          <th>จัดการ</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="leave in requests" :key="leave.LeaveID">
          <td>{{ leave.LeaveID }}</td>
          <td>{{ leave.name }} ({{ leave.id }})</td>
          <td>{{ leave.leave_type }}</td>
          <td>{{ leave.start_date }} - {{ leave.end_date }}</td>
          <td>{{ leave.reason }}</td>
          <td>{{ leave.status }}</td>
          <td>
            <button
              v-if="leave.status === 'waiting'"
              @click="updateStatus(leave.LeaveID, 'approved')"
              class="approve-button"
            >
              approved
            </button>
            <button
              v-if="leave.status === 'waiting'"
              @click="updateStatus(leave.LeaveID, 'declined')"
              class="decline-button"
            >
              decline
            </button>
            <span v-else>-</span>
          </td>
        </tr>
      </tbody>
    </table>

    <div v-else-if="!loading" class="no-data">
      ไม่มีข้อมูลคำขออนุมัติการลา
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      requests: [],
      loading: false,
      error: null,
      message: null,
    };
  },
  methods: {
    async fetchRequests() {
  this.loading = true;
  this.error = null;
  this.message = null;
  try {
    const res = await axios.get(
      "http://127.0.0.1/HrSystem_project/Human-Resource-Management-System_System_Analysis_and_Design_Project/HR_System--/api/leave_request/get_all_leave_requests.php"
    );
    if (Array.isArray(res.data)) {
      this.requests = res.data.sort((a, b) => {
        // ให้ waiting ขึ้นก่อน
        if (a.status === "waiting" && b.status !== "waiting") return -1;
        if (a.status !== "waiting" && b.status === "waiting") return 1;
        // ถ้า status เหมือนกัน ให้เรียงตาม LeaveID
        return a.LeaveID - b.LeaveID;
      });
    } else {
      this.requests = [];
    }
  } catch (err) {
    this.error = "ไม่สามารถโหลดข้อมูลได้";
    console.error(err);
  } finally {
    this.loading = false;
  }
    },
    async updateStatus(LeaveID, status) {
      this.error = null;
      this.message = null;
      try {
        const res = await axios.post(
          "http://127.0.0.1/HrSystem_project/Human-Resource-Management-System_System_Analysis_and_Design_Project/HR_System--/api/leave_request/update_leave_status.php",
          JSON.stringify({ LeaveID: Number(LeaveID), status }),
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        this.message = res.data.message;
        this.fetchRequests();
      } catch (err) {
        this.error = err.response?.data?.message || "ไม่สามารถอัปเดตสถานะได้";
        console.error(err);
      }
    },
    goToDashboard() {
    this.$router.push('/dashboard');
  },
},
  mounted() {
    this.fetchRequests();
  },
};
</script>

<style scoped>
.approval-request-container {
  padding: 20px;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  position: relative;
}

h2 {
  background-color: #840cfe; /* สีม่วง */
  color: white;
  padding: 12px;
  border-radius: 6px;
  text-align: center;
  margin-bottom: 20px;
  position: relative;
}

/* ปุ่ม Dashboard ที่มุมขวาบนของ header */
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
  opacity: 0.85;
}

.loading {
  font-style: italic;
  margin-bottom: 10px;
}

.error {
  color: #f44336; /* แดง */
  margin-bottom: 10px;
  font-weight: bold;
}

.message {
  color: #4caf50; /* เขียว */
  margin-bottom: 10px;
  font-weight: bold;
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

.approve-button,
.decline-button {
  padding: 6px 12px;
  border: none;
  border-radius: 4px;
  color: white;
  font-weight: bold;
  cursor: pointer;
  margin-right: 6px;
  transition: opacity 0.2s ease;
}

.approve-button {
  background-color: #4caf50; /* เขียว */
}

.decline-button {
  background-color: #f44336; /* แดง */
}

.approve-button:hover {
  opacity: 0.8;
}

.decline-button:hover {
  opacity: 0.8;
}

.no-data {
  text-align: center;
  color: #888;
  font-style: italic;
  margin-top: 20px;
}
</style>
