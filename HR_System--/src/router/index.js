import { createRouter, createWebHistory } from 'vue-router';
import Login from '../components/Login.vue';
import Dashboard from '../components/Dashboard.vue';
import AssessmentReview from '../components/AssessmentReview.vue'; // Import the component

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
    path: '/assessment-review',  // Define the path
    name: 'assessment-review',    // Give the route a name (optional, but good practice)
    component: AssessmentReview,  // Specify the component to render
    meta: { requiresAuth: true } // Optionally, protect this route
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    // Check if the user is logged in (your authentication logic)
    if (localStorage.getItem('loggedIn') === 'true') {
      next();
    } else {
      next('/login');
    }
  } else {
    next();
  }
});

export default router;