<template>
    <div class="approval-request-container">
      <div class="header">คำขออนุมัติการลา</div>
  
      <!-- Loading indicator -->
      <div v-if="loading">กำลังโหลด...</div>
  
      <!-- Error message -->
      <div v-if="error" class="error">{{ error }}</div>
  
      <!-- Show leave requests if data exists -->
      <ul v-if="Array.isArray(requests) && requests.length > 0" class="leave-list">
        <li v-for="leave in requests" :key="leave.LeaveID" class="leave-card">
          <p><strong>ชื่อพนักงาน:</strong> {{ leave.name }} (ID: {{ leave.id }})</p>
          <p><strong>ประเภทการลา:</strong> {{ leave.leave_type }}</p>
          <p><strong>วันที่:</strong> {{ leave.start_date }} - {{ leave.end_date }}</p>
          <p><strong>เหตุผล:</strong> {{ leave.reason }}</p>
          <p><strong>สถานะ:</strong> {{ leave.status }}</p>
  
          <!-- Show actions only if status is 'waiting' -->
          <div v-if="leave.status === 'waiting'" class="actions">
            <button @click="updateStatus(leave.LeaveID, 'approved')" class="approve-button">approved</button>
            <button @click="updateStatus(leave.LeaveID, 'declined')" class="decline-button">declined</button>
          </div>
        </li>
      </ul>
  
      <!-- Fallback message if no leave requests -->
      <div v-else-if="!loading" class="no-data">
        ไม่มีข้อมูลคำขออนุมัติการลา
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  const FETCH_URL = 'http://127.0.0.1/HrSystem_project/Human-Resource-Management-System_System_Analysis_and_Design_Project/HR_System--/api/leave_request/get_all_leave_requests.php';
  const UPDATE_URL = 'http://127.0.0.1/HrSystem_project/Human-Resource-Management-System_System_Analysis_and_Design_Project/HR_System--/api/leave_request/update_leave_status.php';
  
  export default {
    data() {
      return {
        requests: [],
        loading: false,
        error: null,
      };
    },
  
    methods: {
      // Fetch requests from API
      async fetchRequests() {
        this.loading = true;
        this.error = null;
        try {
          const res = await axios.get(FETCH_URL);
          console.log("Fetched leave requests:", res.data);
          this.requests = Array.isArray(res.data) ? res.data : [];
        } catch (err) {
          console.error("Error fetching leave requests:", err);
          this.error = "ไม่สามารถโหลดข้อมูลได้";
        } finally {
          this.loading = false;
        }
      },
  
      // Update the leave request status
     // Update the leave request status
     async updateStatus(LeaveID, newStatus) {
  try {
    const response = await axios.post(
      UPDATE_URL,
      JSON.stringify({ LeaveID, status: newStatus }),
      {
        headers: {
          'Content-Type': 'application/json'
        },
      }
    );

    if (response.data.message === "Status updated successfully") {
      this.fetchRequests(); // อัปเดตข้อมูลใหม่
    } else {
      alert(response.data.message || "ไม่สามารถอัปเดตสถานะได้");
    }
  } catch (err) {
    console.error("Error updating leave status:", err);
    alert("ไม่สามารถอัปเดตสถานะได้");
  }
}


    },
  
    mounted() {
      console.log("ApprovalRequest component mounted");
      this.fetchRequests();
    },
  };
  </script>
  
  <style scoped>
  /* Container for the approval request page */
  .approval-request-container {
    padding: 20px;
  }
  
  /* Header styles */
  .header {
    padding: 16px;
    font-size: 24px;
    text-align: center;
    margin-bottom: 20px;
    background-color: #840cfe; /* Purple color */
    color: white;
    border-radius: 8px 8px 0 0;
  }
  
  /* List of leave requests */
  .leave-list {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    list-style: none;
    gap: 16px;
  }
  
  /* Style for each leave card */
  .leave-card {
    border: 1px solid #ccc;
    border-radius: 8px;
    padding: 16px;
    background-color: #fafafa;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
  }
  
  /* Actions section (Approve/Decline buttons) */
  .actions button {
    padding: 10px 15px;
    border-radius: 5px;
    cursor: pointer;
    font-weight: bold;
    margin-top: 10px;
  }
  
  .approve-button {
    background-color: #4CAF50; /* Green for approved */
    color: white;
    border: none;
  }
  
  .decline-button {
    background-color: #f44336; /* Red for declined */
    color: white;
    border: none;
  }
  
  /* Hover effects for buttons */
  .actions button:hover {
    opacity: 0.8;
  }
  
  /* Error message styles */
  .error {
    color: red;
    margin-bottom: 10px;
  }
  
  /* No data message when there are no requests */
  .no-data {
    text-align: center;
    color: #888;
    font-style: italic;
    margin-top: 20px;
  }
  </style>
  