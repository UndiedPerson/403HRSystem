import { createRouter, createWebHistory } from 'vue-router';
import Login from '../components/Login.vue';
import Dashboard from '../components/Dashboard.vue';
import AssessmentReview from '../components/AssessmentReview.vue';
// import SalaryView from '../components/SalaryView.vue'; // Import SalaryView
import EmployeeList from '../components/EmployeeList.vue'; // Import EmployeeList
import LeaveHistory from '../components/LeaveHistory.vue';
import ApprovalRequest from '../components/ApprovalRequest.vue';
import SalaryManagement from '../components/SalaryManagement.vue';

const routes = [
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: Dashboard,
    meta: { requiresAuth: true },
  },
  {
    path: '/assessment-review',
    name: 'assessment-review',
    component: AssessmentReview,
    meta: { requiresAuth: true },
  },
  // {
  //   path: '/salary',
  //   name: 'salary',
  //   component: SalaryView, // Add the salary route
  //   meta: { requiresAuth: true }, // Optional: protect this route
  // },
  {
    path: '/employees',
    name: 'employees', // Added a name for the route
    component: EmployeeList, // Add the employee route
    meta: { requiresAuth: true } // Optional: protect this route
  },
  {path: '/leave-History',
    name: 'leave-History', // Added a name for the route
    component: LeaveHistory, // Add the employee route
    meta: { requiresAuth: true }},

{ path: '/approval-request',
    name: 'approval-request', // Added a name for the route
    component: ApprovalRequest, // Add the employee route
    meta: { requiresAuth: true }
    },
    
    { path: '/salaries-management',
    name: 'salaries-management', // Added a name for the route
    component: SalaryManagement, // Add the employee route
    meta: { requiresAuth: true }
    },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const isLoggedIn = localStorage.getItem('loggedIn') === 'true';

  // ถ้าไปหน้า login แต่ล็อกอินอยู่แล้ว ให้ redirect ไปยังหน้าที่เคยอยู่
  if (to.path === '/login' && isLoggedIn) {
    const lastRoute = localStorage.getItem('lastRoute') || '/dashboard';
    next(lastRoute);
  }
  // ถ้าหน้านี้ต้องการ auth แต่ยังไม่ได้ login
  else if (to.meta.requiresAuth && !isLoggedIn) {
    next('/login');
  } else {
    // เก็บ path ล่าสุดไว้ (ยกเว้น login)
    if (to.path !== '/login') {
      localStorage.setItem('lastRoute', to.fullPath);
    }
    next();
  }
});


export default router;