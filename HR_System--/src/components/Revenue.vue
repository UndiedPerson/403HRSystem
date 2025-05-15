<template>
  <div class="revenue-container">
    <h2>รายงานรายได้ตามสาขา</h2>

    <div v-if="loading" class="loading">กำลังโหลดข้อมูล...</div>
    <div v-else-if="error" class="error">เกิดข้อผิดพลาด: {{ error }}</div>
    <table v-else class="revenue-table">
      <thead>
        <tr>
          <th>สาขา</th>
          <th>รายได้ (บาท)</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="branch in revenues" :key="branch.branch">
          <td>{{ branch.branch }}</td>
          <td class="amount">{{ formatCurrency(branch.revenue) }}</td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <th>รวมทั้งหมด</th>
          <th class="amount">{{ formatCurrency(totalRevenue) }}</th>
        </tr>
      </tfoot>
    </table>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import axios from 'axios';

const revenues = ref([]);
const loading = ref(true);
const error = ref(null);

const totalRevenue = computed(() => {
  return revenues.value.reduce((sum, item) => sum + item.revenue, 0);
});

function formatCurrency(value) {
  return value.toLocaleString('th-TH', {
    style: 'currency',
    currency: 'THB',
    minimumFractionDigits: 2,
  });
}

async function fetchRevenueData() {
  loading.value = true;
  error.value = null;
  try {
    // เปลี่ยน URL เป็น API ของคุณ
    const response = await axios.get('http://127.0.0.1/HrSystem_project/Human-Resource-Management-System_System_Analysis_and_Design_Project/HR_System--/api/revenue-per-branch.php');
    // สมมติว่า API คืนค่าเป็น array เช่น
    // [{ branch: 'สาขากรุงเทพ', revenue: 1500000 }, { branch: 'สาขาเชียงใหม่', revenue: 850000 }, ...]
    revenues.value = response.data;
  } catch (err) {
    error.value = err.message || 'Unknown error';
  } finally {
    loading.value = false;
  }
}

onMounted(() => {
  fetchRevenueData();
});
</script>

<style scoped>
.revenue-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  font-family: sans-serif;
}

h2 {
  text-align: center;
  margin-bottom: 20px;
}

.loading,
.error {
  text-align: center;
  margin: 20px 0;
  color: #555;
}

.revenue-table {
  width: 100%;
  border-collapse: collapse;
}

.revenue-table th,
.revenue-table td {
  border: 1px solid #ccc;
  padding: 12px;
  text-align: left;
}

.revenue-table th {
  background-color: #f0f0f0;
}

.amount {
  text-align: right;
  font-weight: bold;
  color: #2a7a2a;
}

tfoot th {
  background-color: #d3f9d8;
}
</style>
