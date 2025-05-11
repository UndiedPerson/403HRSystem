<template>
  <div class="login-box">
    <h2>Login</h2>
    <form @submit.prevent="handleLogin">
      <div class="input-group">
        <label for="username">Username</label><br />
        <input id="username" v-model="username" type="text" required /><br />
      </div>
      <div class="input-group">
        <label for="password">Password</label><br />
        <input id="password" v-model="password" type="password" required /><br /><br />
      </div>
      <button type="submit">Login</button>
    </form>
    <p v-if="error" style="color:red">{{ error }}</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const username = ref('');
const password = ref('');
const error = ref('');
const router = useRouter();

onMounted(() => {
  // ตรวจสอบว่า router พร้อมใช้งานหรือไม่ (โดยทั่วไปไม่จำเป็นต้องทำใน setup)
});

async function handleLogin() {
  error.value = '';
  try {
    const apiPath = import.meta.env.VITE_APP_ENV === 'development'
      ? '/api/login.php'
      : import.meta.env.BASE_URL + 'api/login.php';

    const res = await fetch(apiPath, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: username.value, password: password.value }),
    });

    const data = await res.json();

    if (data.success) {
      alert('Login successful!');
      localStorage.setItem('loggedIn', 'true'); // เพิ่มบรรทัดนี้: เก็บสถานะการเข้าสู่ระบบ
      router.push({ name: 'dashboard' });
    } else {
      error.value = 'Invalid username or password';
    }
  } catch (e) {
    error.value = 'Error connecting to server';
  }
}
</script>

<style scoped>
.login-box {
  width: 300px;
  margin: 100px auto;
  padding: 20px;
  background: #f3f3f3;
  text-align: center;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
h2 {
  background: #9101FF;
  color: white;
  margin: -20px -20px 20px;
  padding: 15px;
  border-radius: 8px 8px 0 0;
}
.input-group {
  text-align: left;
  margin-bottom: 15px;
}
input {
  width: 100%;
  padding: 10px;
  margin-top: 5px;
  border-radius: 5px;
  border: 1px solid #ccc;
}
button {
  width: 100%;
  padding: 10px;
  background-color: #019EFF;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
button:hover {
  background-color: #3E8DBE;
}
</style>