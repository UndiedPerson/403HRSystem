<template>
    <div class="form-overlay" :style="{ backgroundColor: theme.overlayBackground }">
      <div class="employee-form" :style="{ backgroundColor: theme.formBackground, color: theme.textColor }">
        <h2 :style="{ color: theme.headingColor, borderBottom: `2px solid ${theme.headingBorderColor}`, paddingBottom: '10px', marginBottom: '20px' }">
          {{ employee ? 'Edit Employee' : 'Add Employee' }}
        </h2>
        <form @submit.prevent="saveEmployee">
          <div class="form-group">
            <label for="name" :style="{ color: theme.labelColor }">Name:</label>
            <input type="text" id="name" v-model="formData.name" required
                   :style="{ backgroundColor: theme.inputBackground, color: theme.inputTextColor, borderColor: theme.inputBorderColor }">
          </div>
          <div class="form-group">
            <label for="position" :style="{ color: theme.labelColor }">Position:</label>
            <input type="text" id="position" v-model="formData.position"
                   :style="{ backgroundColor: theme.inputBackground, color: theme.inputTextColor, borderColor: theme.inputBorderColor }">
          </div>
          <div class="form-group">
            <label for="branch" :style="{ color: theme.labelColor }">Branch:</label>
            <input type="text" id="branch" v-model="formData.branch"
                   :style="{ backgroundColor: theme.inputBackground, color: theme.inputTextColor, borderColor: theme.inputBorderColor }">
          </div>
          <div class="form-group">
            <label for="hire_date" :style="{ color: theme.labelColor }">Hire Date:</label>
            <input type="date" id="hire_date" v-model="formData.hire_date"
                   :style="{ backgroundColor: theme.inputBackground, color: theme.inputTextColor, borderColor: theme.inputBorderColor }">
          </div>
          <div class="form-group">
            <label for="contact_number" :style="{ color: theme.labelColor }">Contact Number:</label>
            <input type="text" id="contact_number" v-model="formData.contact_number"
                   :style="{ backgroundColor: theme.inputBackground, color: theme.inputTextColor, borderColor: theme.inputBorderColor }">
          </div>
          <div class="form-group">
            <label for="email" :style="{ color: theme.labelColor }">Email:</label>
            <input type="email" id="email" v-model="formData.email" required
                   :style="{ backgroundColor: theme.inputBackground, color: theme.inputTextColor, borderColor: theme.inputBorderColor }">
          </div>
  
          <div class="form-group">
            <label for="image" :style="{ color: theme.labelColor }">Profile Image:</label>
            <input type="file" id="image" @change="handleImageChange" accept="image/*"
                   :style="{ backgroundColor: theme.inputBackground, color: theme.inputTextColor, borderColor: theme.inputBorderColor }">
            <div v-if="formData.image" class="image-preview">
              <img :src="formData.image" alt="Profile Preview" style="max-width: 100px; max-height: 100px;">
            </div>
          </div>
  
          <div class="form-buttons">
            <button type="submit" :style="{ backgroundColor: theme.primaryButtonBackground, color: theme.primaryButtonTextColor, boxShadow: theme.primaryButtonBoxShadow }">
              <svg class="button-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17 3H7c-1.1 0-2 .9-2 2v16l7-3 7 3V5c0-1.1-.9-2-2-2z"/>
              </svg>
              Save
            </button>
            <button type="button" @click="closeForm" :style="{ backgroundColor: theme.secondaryButtonBackground, color: theme.secondaryButtonTextColor, borderColor: theme.secondaryButtonBorderColor, boxShadow: theme.secondaryButtonBoxShadow }">
              <svg class="button-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
              </svg>
              Cancel
            </button>
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
      },
      theme: {
        type: Object,
        default: () => ({
          overlayBackground: 'rgba(0, 0, 0, 0.5)',
          formBackground: '#FFFFFF',
          textColor: '#333',
          headingColor: '#840CFE',
          headingBorderColor: '#840CFE',
          labelColor: '#555',
          inputBackground: '#EFEFEF',
          inputTextColor: '#333',
          inputBorderColor: '#CCCCCC',
          primaryButtonBackground: '#840CFE',
          primaryButtonTextColor: 'white',
          primaryButtonBoxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
          secondaryButtonBackground: '#FF0000',
          secondaryButtonTextColor: 'white',
          secondaryButtonBorderColor: '#FF0000',
          secondaryButtonBoxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
        }),
      },
    },
    data() {
      return {
        formData: {
          name: '',
          position: '',
          branch: '',
          hire_date: '',
          contact_number: '',
          email: '',
          image: null // Holds the image data or URL
        },
        file: null // Holds the actual file object
      };
    },
    watch: {
      employee(newVal) {
        if (newVal) {
          this.formData = { ...newVal };
          if (newVal.image_path) {
            this.formData.image = newVal.image_path; // Load image URL if available
          }
        } else {
          this.resetForm();
        }
      }
    },
    methods: {
      handleImageChange(event) {
        this.file = event.target.files[0];
        if (this.file) {
          // Create a URL for the image to display it
          this.formData.image = URL.createObjectURL(this.file);
        }
      },
      async saveEmployee() {
        try {
          const formData = new FormData();
          formData.append('name', this.formData.name);
          formData.append('position', this.formData.position);
          formData.append('branch', this.formData.branch);
          formData.append('hire_date', this.formData.hire_date);
          formData.append('contact_number', this.formData.contact_number);
          formData.append('email', this.formData.email);
          if (this.file) {
            formData.append('image', this.file);
          }
  
          if (this.employee) {
            await axios.put(`api/employees/update.php?id=${this.employee.id}`, formData, {
              headers: {
                'Content-Type': 'multipart/form-data'
              }
            });
            alert('Employee updated!');
          } else {
            const response = await axios.post('api/employees/create.php', formData, {
              headers: {
                'Content-Type': 'multipart/form-data'
              }
            });
            console.log("Create response:", response.data); // Log the response
            alert('Employee created!');
          }
          this.$emit('employee-saved'); // Notify the parent component
          this.closeForm();
        } catch (error) {
          console.error('Error saving employee:', error);
          alert('Error saving employee. Please check the console.');
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
          email: '',
          image: null
        };
        this.file = null;
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
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }
  
  .employee-form {
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    width: 400px;
  }
  
  .employee-form h2 {
    margin-top: 0;
    margin-bottom: 15px;
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  .employee-form label {
    display: block;
    margin-bottom: 8px;
    font-weight: 500;
  }
  
  .employee-form input {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-sizing: border-box;
  }
  
  .form-buttons {
    text-align: right;
    margin-top: 25px;
  }
  
  .form-buttons button {
    margin-left: 10px;
    cursor: pointer;
    padding: 10px 20px;
    border-radius: 5px;
    border: none;
    display: inline-flex;
    align-items: center;
    gap: 5px;
    font-weight: 600;
    transition: all 0.2s ease-in-out;
  }
  
  .form-buttons button:hover {
    opacity: 0.9;
    transform: scale(1.02);
  }
  
  .button-icon {
    width: 1.2em;
    height: 1.2em;
  }
  
  .image-preview {
    margin-top: 10px;
  }
  </style>