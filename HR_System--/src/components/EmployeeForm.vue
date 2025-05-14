<template>
  <div class="form-overlay">
    <div class="employee-form">
      <div class="form-header">
        <h2>
          <svg viewBox="0 0 24 24" fill="currentColor" class="header-icon">
            <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
          </svg>
          {{ employee ? 'Edit Employee' : 'Add Employee' }}
        </h2>
      </div>

      <form @submit.prevent="saveEmployee">
        <div class="form-group">
          <label for="name">Name:</label>
          <input type="text" id="name" v-model="formData.name" required />
        </div>
        <div class="form-group">
          <label for="position">Position:</label>
          <input type="text" id="position" v-model="formData.position" />
        </div>
        <div class="form-group">
          <label for="branch">Branch:</label>
          <input type="text" id="branch" v-model="formData.branch" />
        </div>
        <div class="form-group">
          <label for="hire_date">Hire Date:</label>
          <input type="date" id="hire_date" v-model="formData.hire_date" />
        </div>
        <div class="form-group">
          <label for="contact_number">Contact Number:</label>
          <input type="text" id="contact_number" v-model="formData.contact_number" />
        </div>
        <div class="form-group">
          <label for="email">Email:</label>
          <input type="email" id="email" v-model="formData.email" required />
        </div>

        <div class="form-buttons">
          <button type="submit" class="save-btn">Save</button>
          <button type="button" class="cancel-btn" @click="closeForm">Cancel</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  props: {
    employee: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      formData: {
        name: '',
        position: '',
        branch: '',
        hire_date: '',
        contact_number: '',
        email: ''
      }
    };
  },
  watch: {
    employee(newVal) {
      if (newVal) {
        this.formData = { ...newVal };
      } else {
        this.resetForm();
      }
    }
  },
  methods: {
    async saveEmployee() {
      try {
        const formData = new FormData();
        for (const key in this.formData) {
          formData.append(key, this.formData[key]);
        }

        if (this.employee) {
          await axios.put(`http://127.0.0.1/HrSystem_project/Human-Resource-Management-System_System_Analysis_and_Design_Project/HR_System--/api/employees/update.php?id=${this.employee.id}`, formData);
          alert('Employee updated!');
        } else {
          await axios.post('http://127.0.0.1/HrSystem_project/Human-Resource-Management-System_System_Analysis_and_Design_Project/HR_System--/api/employees/create.php', formData);
          alert('Employee created!');
        }

        this.$emit('employee-saved');
        this.closeForm(); // ปิดฟอร์มทันทีหลังบันทึก
      } catch (error) {
        console.error('Error saving employee:', error);
        alert('Error saving employee.');
      }
    },
    closeForm() {
      this.$emit('close');
      this.resetForm();
    },
    resetForm() {
      this.formData = {
        name: '',
        position: '',
        branch: '',
        hire_date: '',
        contact_number: '',
        email: ''
      };
    }
  }
};
</script>

<style scoped>
.form-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.employee-form {
  background-color: #fff;
  width: 600px;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
}

.form-header {
  background-color: #A167E7;
  padding: 20px;
  color: white;
  display: flex;
  align-items: center;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
}

.form-header h2 {
  margin: 0;
  font-size: 1.5em;
  display: flex;
  align-items: center;
}

.header-icon {
  width: 1.5em;
  height: 1.5em;
  margin-right: 10px;
  fill: white;
}

form {
  padding: 25px 30px;
}

.form-group {
  margin-bottom: 18px;
}

.form-group label {
  display: block;
  margin-bottom: 6px;
  font-weight: 600;
  color: #333;
}

.form-group input {
  width: 100%;
  padding: 12px;
  font-size: 16px;
  border-radius: 6px;
  border: 1px solid #ccc;
  box-sizing: border-box;
}

.form-buttons {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 25px;
}

.save-btn,
.cancel-btn {
  padding: 12px 24px;
  font-size: 16px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
}

.save-btn {
  background-color: #6A0DAD;
  color: white;
}

.cancel-btn {
  background-color: #e74c3c;
  color: white;
}
</style>
