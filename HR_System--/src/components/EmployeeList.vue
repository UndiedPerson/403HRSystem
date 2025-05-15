<template>
  <div class="employee-list-container">
    <div class="header" :style="{ backgroundColor: theme.headerBackground, color: theme.headerTextColor }">
      <h2>พนักงานทั้งหมด
        <button @click="goToDashboard" class="dashboard-button">Dashboard</button>
      </h2>
    </div>

    <div class="navigation-tabs">
      <button class="nav-tab active">พนักงาน</button>
      <router-link to="/leave-history">
      <button class="nav-tab">ประวัติการลา</button>
    </router-link>
      <button class="nav-tab">รายงาน</button>
    </div>

    <div class="list-controls">
      <input type="text" v-model="searchQuery" placeholder="ค้นหาพนักงาน..."
             :style="{ backgroundColor: theme.inputBackground, color: theme.inputTextColor, borderColor: theme.inputBorderColor, boxShadow: theme.inputBoxShadow }"
             class="search-input">
      <button @click="searchEmployees" :style="{ backgroundColor: theme.addButtonBackground, color: theme.addButtonTextColor, boxShadow: theme.addButtonBoxShadow }">
        ค้นหา
      </button>
      <button @click="openAddForm" :style="{ backgroundColor: theme.addButtonBackground, color: theme.addButtonTextColor, boxShadow: theme.addButtonBoxShadow }">
        เพิ่มพนักงาน
      </button>
    </div>

    <div v-if="loading">กำลังโหลดข้อมูล...</div>
    <div v-if="error">{{ error }}</div>

    <div class="employee-cards">
      <div v-for="employee in filteredEmployees" :key="employee.id" class="employee-card" :style="{ borderColor: theme.cardBorderColor }">
        <div class="employee-avatar">
          <img v-if="employee.image_path" :src="employee.image_path" alt="Profile" />
          <svg v-else viewBox="0 0 24 24" fill="currentColor" width="48" height="48">
            <path d="M12 4a4 4 0 0 1 4 4 4 4 0 0 1-4 4 4 4 0 0 1-4-4 4 4 0 0 1 4-4m0 10c4.42 0 8 1.79 8 4v2H4v-2c0-2.21 3.58-4 8-4z"/>
          </svg>
        </div>
        <div class="employee-details">
          <div class="employee-name">{{ employee.name }}</div>
          <div class="employee-position">{{ employee.position }}</div>
          <div class="employee-email">{{ employee.email }}</div>
          <div class="employee-status">{{ employee.status || 'Active' }}</div>
          <div class="employee-branch">สาขา: {{ employee.branch }}</div>
          <div class="employee-hire-date">เริ่มงาน: {{ employee.hire_date }}</div>
        </div>
        <div class="employee-actions">
          <button @click="editEmployee(employee)" :style="{ backgroundColor: theme.editButtonBackground, color: theme.editButtonTextColor, boxShadow: theme.editButtonBoxShadow }">
            แก้ไข
          </button>
          <button @click="openDeleteModal(employee)" :style="{ backgroundColor: theme.deleteButtonBackground, color: theme.deleteButtonTextColor, boxShadow: theme.deleteButtonBoxShadow }">
            ลบ
          </button>
        </div>
      </div>
    </div>

    <div v-if="!filteredEmployees.length && !loading && !error" class="no-results">
      ไม่พบข้อมูลพนักงาน
    </div>

    <EmployeeForm v-if="showForm" :employee="selectedEmployee" @employee-saved="fetchEmployees" @close="closeForm" :theme="theme" />

    <!-- Delete Confirmation Modal -->
    <div v-if="showDeleteModal" class="modal-overlay">
      <div class="modal-content">
        <div class="modal-header">
          <h3>ยืนยันการลบพนักงาน</h3>
        </div>
        <div v-if="employeeToDelete">
          <p><strong>ID พนักงาน:</strong> {{ employeeToDelete.id }}</p>
          <p><strong>ชื่อ:</strong> {{ employeeToDelete.name }}</p>
          <p><strong>ตำแหน่ง:</strong> {{ employeeToDelete.position }}</p>
          <p><strong>อีเมล:</strong> {{ employeeToDelete.email }}</p>
        </div>
        <p>กรุณาพิมพ์ <strong>"DELETE THIS EMPLOYEE"</strong> เพื่อยืนยัน</p>
        <input
          type="text"
          v-model="deleteConfirmationText"
          :class="{ 'invalid-input': deleteConfirmationText && deleteConfirmationText !== 'DELETE THIS EMPLOYEE' }"
          placeholder='พิมพ์ "DELETE THIS EMPLOYEE"'
        />
        <p class="error-text" v-if="deleteError">{{ deleteError }}</p>
        <div class="modal-actions">
          <button class="cancel-button" @click="cancelDelete">ยกเลิก</button>
          <button class="confirm-button" :disabled="deleteConfirmationText !== 'DELETE THIS EMPLOYEE'" @click="confirmDelete">
            ลบ
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import EmployeeForm from './EmployeeForm.vue';
import axios from 'axios';

const API_BASE = 'http://127.0.0.1/HrSystem_project/Human-Resource-Management-System_System_Analysis_and_Design_Project/HR_System--/api/employees/';

export default {
  components: { EmployeeForm },
  props: {
    theme: {
      type: Object,
      default: () => ({
        headerBackground: '#840CFE',
        headerTextColor: 'white',
        inputBackground: '#EFEFEF',
        inputTextColor: '#333',
        inputBorderColor: '#CCCCCC',
        inputBoxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        addButtonBackground: '#840CFE',
        addButtonTextColor: 'white',
        addButtonBoxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
        cardBorderColor: '#CCCCCC',
        editButtonBackground: '#0192D9',
        editButtonTextColor: 'white',
        editButtonBoxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
        deleteButtonBackground: '#FF0000',
        deleteButtonTextColor: 'white',
        deleteButtonBoxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
      }),
    },
  },
  data() {
    return {
      employees: [],
      searchQuery: '',
      showForm: false,
      selectedEmployee: null,
      loading: false,
      error: null,
      showDeleteModal: false,
      deleteConfirmationText: '',
      employeeToDelete: null,
      deleteError: '',
      autoRefresh: null,
    };
  },
  computed: {
    filteredEmployees() {
      if (!this.searchQuery) return this.employees;
      return this.employees.filter(employee =>
        employee.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        employee.position.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        employee.branch.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
  },
  methods: {
    async fetchEmployees() {
      this.loading = true;
      this.error = null;
      try {
        const response = await axios.get(`${API_BASE}read.php`);
        this.employees = response.data;
      } catch (err) {
        this.error = 'ไม่สามารถโหลดข้อมูลพนักงานได้';
      } finally {
        this.loading = false;
      }
    },
    async searchEmployees() {
      if (!this.searchQuery.trim()) {
        this.fetchEmployees();
        return;
      }

      this.loading = true;
      this.error = null;
      try {
        const response = await axios.get(`${API_BASE}read_one.php?search=${this.searchQuery}`);
        this.employees = response.data;
      } catch (err) {
        this.error = 'ไม่สามารถค้นหาข้อมูลพนักงานได้';
      } finally {
        this.loading = false;
      }
    },
    openDeleteModal(employee) {
      this.employeeToDelete = employee;
      this.showDeleteModal = true;
      this.deleteConfirmationText = '';
      this.deleteError = '';
    },
    cancelDelete() {
      this.showDeleteModal = false;
      this.deleteConfirmationText = '';
      this.employeeToDelete = null;
      this.deleteError = '';
    },
    async confirmDelete() {
  if (this.deleteConfirmationText === 'DELETE THIS EMPLOYEE') {
    try {
      const response = await axios.post(`${API_BASE}delete.php`, {
        id: this.employeeToDelete.id,
        confirm: this.deleteConfirmationText // ส่งคำยืนยันไปในคำขอ
      });

      if (response.data.success) {
        this.fetchEmployees();  // รีเฟรชข้อมูลพนักงาน
        this.cancelDelete();    // ปิด modal
      } else {
        this.deleteError = response.data.message;  // แสดงข้อความข้อผิดพลาดจาก PHP
      }
    } catch (error) {
      console.error('Error deleting employee:', error);
      this.deleteError = 'เกิดข้อผิดพลาดในการลบพนักงาน';
    }
  } else {
    this.deleteError = 'กรุณาพิมพ์ "DELETE THIS EMPLOYEE" เพื่อยืนยันการลบ';
  }
},


    editEmployee(employee) {
      // Create a copy of the employee data without the status field
      this.selectedEmployee = { ...employee };
      delete this.selectedEmployee.status;  // Exclude the status field
      this.showForm = true;
    },
    openAddForm() {
      this.selectedEmployee = null;
      this.showForm = true;
    },
    closeForm() {
      this.showForm = false;
      this.selectedEmployee = null;
    },
    goToDashboard() {
    this.$router.push('/dashboard');
  },
  },
  
  mounted() {
    this.fetchEmployees();
    this.autoRefresh = setInterval(this.fetchEmployees, 5000);
  },
  beforeUnmount() {
    clearInterval(this.autoRefresh);
  }
};
</script>

<style scoped>

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
.dashboard-button {
  position: absolute;
  top: 50%;
  right: 100px;
  transform: translateY(-1300%);
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
