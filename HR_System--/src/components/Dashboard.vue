<template>
  <div class="owner-dashboard">
    <header class="dashboard-header">
      <h1>{{ username }} Dashboard</h1>
      <button class="logout-button" @click="logout">Logout</button>
    </header>

    <div class="search-bar">
      <svg class="search-icon" viewBox="0 0 24 24">
        <path fill="#7C4DFF" d="M15.5 14h-.79l-.28-.27A6.47 6.47 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7 14 5 12 5 9.5S7 5 9.5 5 14 7 14 9.5 12 14 9.5 14z"/>
      </svg>
      <input type="text" placeholder="Search Data Here" v-model="searchQuery" @input="onSearch" />
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

      <div class="dashboard-card employees-card" @click="goToEmployeeList">
        <div class="card-content">
          <svg class="card-icon" viewBox="0 0 24 24">
            <path fill="#4CAF50" d="M16 11c1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3 1.34 3 3 3zm-8 0c1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3 1.34 3 3 3zm0 2c-2.33 0-4.31 1.45-5.16 3.5c.17.05.34.08.51.08h10.3c.17 0 .34-.03.51-.08-.85-2.05-2.83-3.5-5.16-3.5zM16 13c-2 0-3.2 1.4-3.2 1.4h.4c.2.6 1.1 1 2.8 1 .7 0 1.3-.3 1.6-.7l.1-.2c.2-.1.5-.1.7 0l.2.2c.3.4.9.7 1.6.7 1.7 0 2.6-.4 2.8-1h.4s-1.2-1.4-3.2-1.4z"/>
          </svg>
          <p class="card-title">Employee Management</p>
        </div>
      </div>

      <div class="dashboard-card approval-card" @click="GotoApprovalRequest">
        <div class="card-content">
          <svg class="card-icon" viewBox="0 0 24 24">
            <path fill="#F44336" d="M21 3h-6.18C13.9 3 13 3.9 13 5.06V19c0 1.1.9 2 2 2h6c1.1 0 2-.9 2-2V5.06C23 3.9 22.1 3 21 3zM15 11h6v2h-6v-2zm0 4h6v2h-6v-2zM3 17h8v2H3v-2zm0-4h8v2H3v-2zm0-4h8v2H3V9z"/>
          </svg>
          <p class="card-title">Approval Request</p>
        </div>
      </div>

      <div class="dashboard-card revenue-card" @click="gotoRevenue">
        <div class="card-content">
          <svg class="card-icon" viewBox="0 0 24 24">
            <path fill="#FFC107" d="M22 11V9L12 2L2 9v2h2v9c0 .55.45 1 1 1h16c.55 0 1-.45 1-1v-9h2zm-4 8h-4v-4h4v4zm-6 0h-4v-4h4v4zm-6 0H4v-4h4v4zM4 11l8-5.5L20 11H4z"/>
          </svg>
          <p class="card-title">Sum Revenue 5M</p>
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

    <div v-if="showTaskMenuOverlay" class="task-menu-overlay" @click.self="closeTaskMenu">
      <div class="task-menu">
        <button class="task-menu-button" @click="goToAssessmentReviewPage">ตรวจสอบการประเมิน</button>
        <button class="task-menu-button" @click="goToEmployeeListFromTask">ไปที่หน้าพนักงาน</button>
        <button class="task-menu-button" @click="goToSalaryManagement">ไปที่หน้าจัดการเงินเดือน</button>
        <button class="task-menu-button" @click="closeTaskMenu">ปิด</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Dashboard',
  data() {
    return {
      username: '',
      showTaskMenuOverlay: false,
      searchQuery: '',
    };
  },
  mounted() {
    // ดึง username จาก localStorage
    this.username = localStorage.getItem('username') || '';
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
    goToEmployeeList() {
      this.$router.push('/employees');
    },
    goToEmployeeListFromTask() {
      this.showTaskMenuOverlay = false;
      this.$router.push('/employees');
    },
    GotoApprovalRequest() {
      this.$router.push('/approval-request');
    },
    goToSalaryManagement() {
      this.$router.push('/salaries-management');
    },
    gotoRevenue() {
      this.$router.push('/revenue');
    },
    logout() {
      localStorage.removeItem('loggedIn');
      localStorage.removeItem('username');
      this.$router.push('/login');
    },
    onSearch() {
      // เพิ่ม action สำหรับ search ได้ในอนาคต
      console.log('Search:', this.searchQuery);
    }
  },
};
</script>

<style scoped>
.owner-dashboard {
  background-color: #fafafa;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 25px 15px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.dashboard-header {
  background-color: #840CFE;
  color: white;
  padding: 18px 25px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 1200px;
  box-sizing: border-box;
  border-radius: 6px;
  margin-bottom: 25px;
  box-shadow: 0 2px 6px rgba(98,0,234,0.4);
}

.dashboard-header h1 {
  margin: 0;
  font-size: 2.2rem;
  font-weight: 600;
}

.logout-button {
  background-color: #FFC107;
  color: white;
  border: none;
  padding: 12px 22px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 600;
  transition: background-color 0.3s ease;
}
.logout-button:hover {
  background-color: #9b7e26;
}

.search-bar {
  background-color: white;
  padding: 10px 15px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  margin-bottom: 25px;
  width: 100%;
  max-width: 1200px;
  box-sizing: border-box;
  box-shadow: 0 1px 4px rgba(0,0,0,0.1);
}

.search-icon {
  width: 26px;
  height: 26px;
  margin-right: 14px;
  fill: #6200ea;
}

.search-bar input[type="text"] {
  border: none;
  padding: 10px 5px;
  flex-grow: 1;
  font-size: 1.1rem;
  font-weight: 500;
  background-color: transparent;
  outline: none;
}

.dashboard-content {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 24px;
  width: 100%;
  max-width: 1200px;
  box-sizing: border-box;
}

.dashboard-card {
  background-color: white;
  padding: 22px;
  border-radius: 10px;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.12);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  cursor: pointer;
  transition: box-shadow 0.25s ease;
}

.dashboard-card:hover {
  box-shadow: 0 5px 15px rgba(0,0,0,0.18);
}

.card-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}

.card-icon {
  width: 48px;
  height: 48px;
  margin-bottom: 14px;
}

.card-icon.large {
  width: 72px;
  height: 72px;
}

.card-title {
  margin: 0;
  font-size: 1.2rem;
  font-weight: 700;
  color: #333;
}

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
  z-index: 1100;
}

.task-menu {
  background-color: white;
  padding: 28px 30px;
  border-radius: 12px;
  box-shadow: 0 6px 14px rgba(0, 0, 0, 0.22);
  display: flex;
  flex-direction: column;
  align-items: stretch;
  width: 300px;
}

.task-menu-button {
  background-color: #9101FF;
  color: white;
  border: none;
  padding: 14px 20px;
  border-radius: 7px;
  cursor: pointer;
  margin-bottom: 16px;
  font-size: 1rem;
  font-weight: 600;
  transition: background-color 0.3s ease;
}

.task-menu-button:hover {
  background-color: #462460;
}
</style>
