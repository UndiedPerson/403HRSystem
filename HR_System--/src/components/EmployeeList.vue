<template>
  <div class="employee-list-container">
    <div class="header" :style="{ backgroundColor: theme.headerBackground, color: theme.headerTextColor }">
      <h2>พนักงานทั้งหมด</h2>
    </div>

    <div class="navigation-tabs">
      <button class="nav-tab active">พนักงาน</button>
      <button class="nav-tab">ประวัติการลา</button>
      <button class="nav-tab">รายงาน</button>
    </div>

    <div class="list-controls">
      <input type="text" v-model="searchQuery" placeholder="ค้นหาพนักงาน..."
             :style="{ backgroundColor: theme.inputBackground, color: theme.inputTextColor, borderColor: theme.inputBorderColor, boxShadow: theme.inputBoxShadow }">
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
      <div v-if="filteredEmployees.length === 0" class="no-results">ไม่พบพนักงาน</div>
    </div>

    <!-- Modal Delete Confirmation -->
    <div v-if="showDeleteModal" class="modal-overlay">
      <div class="modal-content">
        <h3>ยืนยันการลบพนักงาน</h3>
        <p>กรุณาพิมพ์ <strong>"DELETE THIS EMPLOYEE"</strong> เพื่อยืนยัน</p>
        <input type="text" v-model="deleteConfirmationText" placeholder='พิมพ์ "DELETE THIS EMPLOYEE"' />
        <div class="modal-actions">
          <button class="cancel-button" @click="cancelDelete">ยกเลิก</button>
          <button class="confirm-button" :disabled="deleteConfirmationText !== 'DELETE THIS EMPLOYEE'" @click="confirmDelete">
            ลบ
          </button>
        </div>
      </div>
    </div>

    <EmployeeForm v-if="showForm" :employee="selectedEmployee" @employee-saved="fetchEmployees" @close="closeForm" :theme="theme" />
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
      employeeToDelete: null,
      deleteConfirmationText: '',
    };
  },
  computed: {
    filteredEmployees() {
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
    editEmployee(employee) {
      this.selectedEmployee = { ...employee };
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
    openDeleteModal(employee) {
      this.employeeToDelete = employee;
      this.deleteConfirmationText = '';
      this.showDeleteModal = true;
    },
    cancelDelete() {
      this.showDeleteModal = false;
      this.employeeToDelete = null;
    },
    async confirmDelete() {
      try {
        await axios.get(`${API_BASE}delete.php?id=${this.employeeToDelete.id}&confirm=DELETE THIS EMPLOYEE`);
        this.fetchEmployees();
        this.cancelDelete();
      } catch (error) {
        console.error('Error deleting employee:', error);
      }
    }
  },
  mounted() {
    this.fetchEmployees();
    setInterval(this.fetchEmployees, 5000);
  }
};
</script>

<style scoped>
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
  background-color: #840CFE;
  color: white;
}
.list-controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}
.list-controls input[type="text"] {
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
  max-height: 600px;
  overflow-y: auto;
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
.employee-status,
.employee-branch,
.employee-hire-date {
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
.no-results {
  text-align: center;
  color: #888;
  font-style: italic;
}

/* Modal */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}
.modal-content {
  background: white;
  padding: 30px;
  border-radius: 10px;
  width: 400px;
  max-width: 90%;
  text-align: center;
}
.modal-content h3 {
  margin-bottom: 10px;
}
.modal-content input {
  width: 100%;
  padding: 10px;
  margin: 15px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
}
.modal-actions {
  display: flex;
  justify-content: space-between;
}
.confirm-button {
  background-color: red;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 5px;
  flex: 1;
  margin-left: 10px;
}
.cancel-button {
  background-color: #ccc;
  color: #333;
  padding: 10px;
  border: none;
  border-radius: 5px;
  flex: 1;
  margin-right: 10px;
}
.confirm-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>
