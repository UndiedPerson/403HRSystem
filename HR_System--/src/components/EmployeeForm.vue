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
          <input type="text" id="name" v-model="formData.name" :readonly="isEditMode" required />
        </div>
        <div class="form-group">
          <label for="position">Position:</label>
          <input type="text" id="position" v-model="formData.position" required />
        </div>
        <div class="form-group">
          <label for="branch">Branch:</label>
          <input type="text" id="branch" v-model="formData.branch" required />
        </div>
        <div class="form-group">
          <label for="hire_date">Hire Date:</label>
          <input type="date" id="hire_date" v-model="formData.hire_date" required :readonly="isEditMode" />
        </div>
        <div class="form-group">
  <label for="contact_number">Contact Number:</label>
  <input
    type="text"
    id="contact_number"
    v-model="formData.contact_number"
    @input="validateContactNumber"
    maxlength="10"
    :readonly="isEditMode"
  />
  <p v-if="contactNumberError" class="input-error">{{ contactNumberError }}</p>

</div>


        
        <div class="form-group">
          <label for="email">Email:</label>
          <input type="email" id="email" v-model="formData.email" :readonly="isEditMode" required />
        </div>

        <div class="form-buttons">
          <button type="submit" class="save-btn" @click="saveEmployee">Save</button>
          <button type="button" class="cancel-btn" @click="closeForm">Cancel</button>
        </div>
      </form>

      <!-- ข้อความเตือนเมื่อข้อมูลซ้ำ -->
      <div v-if="isDuplicate" class="error-message">
        <p>ชื่อ, เบอร์โทร หรือ อีเมลนี้มีในระบบแล้ว กรุณาตรวจสอบข้อมูลใหม่</p>
      </div>
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
  methods: {
    validateContactNumber() {
  // เอาเฉพาะตัวเลข
  let value = this.formData.contact_number.replace(/\D/g, '');

  // ถ้ายังไม่มีอะไรพิมพ์ → ไม่แจ้งเตือน
  if (value.length === 0) {
    this.contactNumberError = '';
    this.formData.contact_number = '';
    return;
  }

  // ถ้าตัวแรกไม่ใช่ 0 → ล้างออกทันที
  if (value[0] !== '0') {
    this.contactNumberError = 'เบอร์โทรต้องขึ้นต้นด้วยเลข 0';
    this.formData.contact_number = '';
    return;
  }

  // ตัดความยาวให้ไม่เกิน 10 ตัว
  if (value.length > 10) {
    value = value.slice(0, 10);
  }

  // ไม่มี error
  this.contactNumberError = '';
  this.formData.contact_number = value;
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
      },
      isDuplicate: false, // ใช้เพื่อเช็คว่าเกิดข้อมูลซ้ำหรือไม่
      contactNumberError: '' // ใช้เก็บข้อความแจ้งเตือน
    };
  },
  computed: {
    isEditMode() {
      return !!this.employee;
    }
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
        // ตรวจสอบข้อมูลก่อนที่จะบันทึก
        await this.checkDuplicates();

        if (this.isDuplicate) {
          // ถ้ามีข้อมูลซ้ำ ไม่ทำการบันทึก
          alert("มีข้อมูลซ้ำในระบบ!");
          return;
        }

        let payload;

        if (this.employee) {
          // Edit Mode: Merge old data with new non-empty values
          payload = { ...this.employee };
          for (const key in this.formData) {
            if (this.formData[key] !== '') {
              payload[key] = this.formData[key];
            }
          }
          payload.id = this.employee.id;
        } else {
          // Create Mode
          payload = { ...this.formData };
        }

        const url = this.employee
          ? 'http://127.0.0.1/HrSystem_project/Human-Resource-Management-System_System_Analysis_and_Design_Project/HR_System--/api/employees/update.php'
          : 'http://127.0.0.1/HrSystem_project/Human-Resource-Management-System_System_Analysis_and_Design_Project/HR_System--/api/employees/create.php';

        await axios.post(url, payload);

        alert(this.employee ? 'Employee updated!' : 'Employee created!');
        this.$emit('employee-saved');
        this.closeForm();
      } catch (error) {
        console.error('Error saving employee:', error);
        alert('Error saving employee.');
      }
    },
    async checkDuplicates() {
      try {
        const { name, email, contact_number } = this.formData;
        const response = await axios.post('http://127.0.0.1/HrSystem_project/Human-Resource-Management-System_System_Analysis_and_Design_Project/HR_System--/api/employees/check_duplicates.php', {
          name,
          email,
          contact_number
        });

        if (response.data.isDuplicate) {
          this.isDuplicate = true;
        } else {
          this.isDuplicate = false;
        }
      } catch (error) {
        console.error('Error checking duplicates:', error);
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
      this.isDuplicate = false; // reset duplicate state
      
    }
  },

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

.form-group input,
.form-group select {
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

.error-message {
  margin-top: 20px;
  background-color: #fdecea;
  color: #c0392b;
  padding: 12px 16px;
  border-radius: 6px;
  font-size: 14px;
  text-align: center;
  border: 1px solid #e0b4b4;
}

</style>
