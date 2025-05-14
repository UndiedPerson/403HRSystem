import { createRouter, createWebHistory } from 'vue-router';
import Login from '../components/Login.vue';
import Dashboard from '../components/Dashboard.vue';
import AssessmentReview from '../components/AssessmentReview.vue';
// import SalaryView from '../components/SalaryView.vue'; // Import SalaryView
import EmployeeList from '../components/EmployeeList.vue'; // Import EmployeeList
import LeaveHistory from '../components/LeaveHistory.vue';

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
    meta: { requiresAuth: true }

  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    // Check if the user is logged in
    if (localStorage.getItem('loggedIn') === 'true') {
      next(); // Allow access to the route
    } else {
      next('/login'); // Redirect to login if not logged in
    }
  } else {
    next(); // Allow access to non-protected routes
  }
});

export default router;