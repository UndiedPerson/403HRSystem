<template>
  <div class="owner-dashboard">
    <header class="dashboard-header">
      <h1>Owner Dashboard</h1>
      <button class="logout-button">Logout</button>
    </header>

    <div class="search-bar">
      <svg class="search-icon" viewBox="0 0 24 24">
        <path fill="#7C4DFF" d="M15.5 14h-.79l-.28-.27A6.47 6.47 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7 14 5 12 5 9.5S7 5 9.5 5 14 7 14 9.5 12 14 9.5 14z"/>
      </svg>
      <input type="text" placeholder="Search Data Here">
    </div>

    <div class="dashboard-content">
      <div class="dashboard-card task-card" @click="showTaskMenu">
        <div class="card-content">
          <svg class="card-icon large" viewBox="0 0 24 24">
            <path fill="#64B5F6" d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
          </svg>
          <p class="card-title">Your Task</p>
        </div>
      </div>

      <div class="dashboard-card employees-card">
        <div class="card-content">
          <svg class="card-icon" viewBox="0 0 24 24">
            <path fill="#4CAF50" d="M16 11c1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3 1.34 3 3 3zm-8 0c1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3 1.34 3 3 3zm0 2c-2.33 0-4.31 1.45-5.16 3.5c.17.05.34.08.51.08h10.3c.17 0 .34-.03.51-.08-.85-2.05-2.83-3.5-5.16-3.5zM16 13c-2 0-3.2 1.4-3.2 1.4h.4c.2.6 1.1 1 2.8 1 .7 0 1.3-.3 1.6-.7l.1-.2c.2-.1.5-.1.7 0l.2.2c.3.4.9.7 1.6.7 1.7 0 2.6-.4 2.8-1h.4s-1.2-1.4-3.2-1.4z"/>
          </svg>
          <p class="card-title">20000 Employees</p>
        </div>
      </div>

      <div class="dashboard-card revenue-card">
        <div class="card-content">
          <svg class="card-icon" viewBox="0 0 24 24">
            <path fill="#FFC107" d="M22 11V9L12 2L2 9v2h2v9c0 .55.45 1 1 1h16c.55 0 1-.45 1-1v-9h2zm-4 8h-4v-4h4v4zm-6 0h-4v-4h4v4zm-6 0H4v-4h4v4zM4 11l8-5.5L20 11H4z"/>
          </svg>
          <p class="card-title">Sum Revenue 5M</p>
        </div>
      </div>

      <div class="dashboard-card approval-card">
        <div class="card-content">
          <svg class="card-icon" viewBox="0 0 24 24">
            <path fill="#F44336" d="M21 3h-6.18C13.9 3 13 3.9 13 5.06V19c0 1.1.9 2 2 2h6c1.1 0 2-.9 2-2V5.06C23 3.9 22.1 3 21 3zM15 11h6v2h-6v-2zm0 4h6v2h-6v-2zM3 17h8v2H3v-2zm0-4h8v2H3v-2zm0-4h8v2H3V9z"/>
          </svg>
          <p class="card-title">Approval Request</p>
        </div>
      </div>

      <div class="dashboard-card expenses-card">
        <div class="card-content">
          <svg class="card-icon" viewBox="0 0 24 24">
            <path fill="#03A9F4" d="M13 16v-2h-1v-4h1V8h3l-4-4-4 4h3v2h-1v4h1v2H4v3c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2v-3h-5z"/>
          </svg>
          <p class="card-title">Sum Expense -2M</p>
        </div>
      </div>
    </div>

    <div v-if="showTaskMenuOverlay" class="task-menu-overlay">
      <div class="task-menu">
        <button class="task-menu-button" @click="goToAssessmentReviewPage">ตรวจสอบการประเมิน</button>
        <button class="task-menu-button">ฟังก์ชันอื่นๆ 1</button>
        <button class="task-menu-button">ฟังก์ชันอื่นๆ 2</button>
        <button class="task-menu-button" @click="closeTaskMenu">ปิด</button>
      </div>
    </div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router';

export default {
  name: 'OwnerDashboard',
  data() {
    return {
      showTaskMenuOverlay: false,
    };
  },
  methods: {
    showTaskMenu() {
      this.showTaskMenuOverlay = true;
    },
    closeTaskMenu() {
      this.showTaskMenuOverlay = false;
    },
    goToAssessmentReviewPage() {
      this.showTaskMenuOverlay = false;
      this.$router.push('/assessment-review');
    },
  },
  setup() {
    const router = useRouter();
    return { router };
  },
};
</script>

<style scoped>
.owner-dashboard {
  background-color: #f0f0f0;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  font-family: sans-serif;
}

.dashboard-header {
  background-color: #9400D3;
  color: white;
  padding: 20px 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  box-sizing: border-box;
  margin-bottom: 20px;
}

.dashboard-header h1 {
  margin: 0;
  font-size: 2.5em;
}

.logout-button {
  background-color: #FFA500;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1em;
}

.search-bar {
  background-color: #e0e0e0;
  padding: 10px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  width: 80%;
  box-sizing: border-box;
}

.search-icon {
  width: 24px;
  height: 24px;
  margin-right: 10px;
  fill: #7C4DFF;
}

.search-bar input[type="text"] {
  border: none;
  padding: 8px;
  flex-grow: 1;
  font-size: 1em;
  background-color: transparent;
}

.dashboard-content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  width: 80%;
  box-sizing: border-box;
}

.dashboard-card {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  cursor: pointer; /* ทำให้ card เป็น pointer เมื่อ hover */
}

.card-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: 100%;
  height: 100%;
}

.card-icon {
  width: 40px;
  height: 40px;
  margin-bottom: 10px;
}

.card-icon.large {
  width: 60px;
  height: 60px;
}

.card-title {
  margin: 0;
  font-size: 1.1em;
  font-weight: bold;
  color: #333;
}

/* ปรับสี fill ของไอคอนให้เหมาะสม */
.task-card .card-icon {
  fill: #64B5F6;
}

.employees-card .card-icon {
  fill: #4CAF50;
}

.revenue-card .card-icon {
  fill: #FFC107;
}

.approval-card .card-icon {
  fill: #F44336;
}

.expenses-card .card-icon {
  fill: #03A9F4;
}

/* Task Menu Overlay Styles */
.task-menu-overlay {
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

.task-menu {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  align-items: center;
}

.task-menu-button {
  background-color: #4CAF50;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  margin-bottom: 10px;
  width: 100%;
  text-align: center;
}

.task-menu-button:hover {
  background-color: #45a049;
}
</style>