export default (await import('vue')).defineComponent({
    name: 'Dashboard',
    data() {
        return {
            username: '',
            showTaskMenuOverlay: false,
            searchQuery: '',
        };
    },
    mounted() {
        // ดึง username จาก localStorage
        this.username = localStorage.getItem('username') || '';
    },
    methods: {
        showTaskMenu() {
            this.showTaskMenuOverlay = true;
        },
        closeTaskMenu() {
            this.showTaskMenuOverlay = false;
        },
        goToAssessmentReviewPage() {
            this.showTaskMenuOverlay = false;
            this.$router.push('/assessment-review');
        },
        goToEmployeeList() {
            this.$router.push('/employees');
        },
        goToEmployeeListFromTask() {
            this.showTaskMenuOverlay = false;
            this.$router.push('/employees');
        },
        GotoApprovalRequest() {
            this.$router.push('/approval-request');
        },
        goToSalaryManagement() {
            this.$router.push('/salaries-management');
        },
        gotoRevenue() {
            this.$router.push('/revenue');
        },
        logout() {
            localStorage.removeItem('loggedIn');
            localStorage.removeItem('username');
            this.$router.push('/login');
        },
        onSearch() {
            // เพิ่ม action สำหรับ search ได้ในอนาคต
            console.log('Search:', this.searchQuery);
        }
    },
});
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['dashboard-header']} */ ;
/** @type {__VLS_StyleScopedClasses['logout-button']} */ ;
/** @type {__VLS_StyleScopedClasses['search-bar']} */ ;
/** @type {__VLS_StyleScopedClasses['dashboard-card']} */ ;
/** @type {__VLS_StyleScopedClasses['card-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['card-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['card-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['card-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['card-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['card-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['task-menu-button']} */ ;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "owner-dashboard" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.header, __VLS_intrinsicElements.header)({
    ...{ class: "dashboard-header" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.h1, __VLS_intrinsicElements.h1)({});
(__VLS_ctx.username);
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
    ...{ onClick: (__VLS_ctx.logout) },
    ...{ class: "logout-button" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "search-bar" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.svg, __VLS_intrinsicElements.svg)({
    ...{ class: "search-icon" },
    viewBox: "0 0 24 24",
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.path)({
    fill: "#7C4DFF",
    d: "M15.5 14h-.79l-.28-.27A6.47 6.47 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7 14 5 12 5 9.5S7 5 9.5 5 14 7 14 9.5 12 14 9.5 14z",
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
    ...{ onInput: (__VLS_ctx.onSearch) },
    type: "text",
    placeholder: "Search Data Here",
    value: (__VLS_ctx.searchQuery),
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "dashboard-content" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ onClick: (__VLS_ctx.showTaskMenu) },
    ...{ class: "dashboard-card task-card" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "card-content" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.svg, __VLS_intrinsicElements.svg)({
    ...{ class: "card-icon large" },
    viewBox: "0 0 24 24",
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.path)({
    fill: "#64B5F6",
    d: "M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z",
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
    ...{ class: "card-title" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ onClick: (__VLS_ctx.goToEmployeeList) },
    ...{ class: "dashboard-card employees-card" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "card-content" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.svg, __VLS_intrinsicElements.svg)({
    ...{ class: "card-icon" },
    viewBox: "0 0 24 24",
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.path)({
    fill: "#4CAF50",
    d: "M16 11c1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3 1.34 3 3 3zm-8 0c1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3 1.34 3 3 3zm0 2c-2.33 0-4.31 1.45-5.16 3.5c.17.05.34.08.51.08h10.3c.17 0 .34-.03.51-.08-.85-2.05-2.83-3.5-5.16-3.5zM16 13c-2 0-3.2 1.4-3.2 1.4h.4c.2.6 1.1 1 2.8 1 .7 0 1.3-.3 1.6-.7l.1-.2c.2-.1.5-.1.7 0l.2.2c.3.4.9.7 1.6.7 1.7 0 2.6-.4 2.8-1h.4s-1.2-1.4-3.2-1.4z",
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
    ...{ class: "card-title" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ onClick: (__VLS_ctx.GotoApprovalRequest) },
    ...{ class: "dashboard-card approval-card" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "card-content" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.svg, __VLS_intrinsicElements.svg)({
    ...{ class: "card-icon" },
    viewBox: "0 0 24 24",
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.path)({
    fill: "#F44336",
    d: "M21 3h-6.18C13.9 3 13 3.9 13 5.06V19c0 1.1.9 2 2 2h6c1.1 0 2-.9 2-2V5.06C23 3.9 22.1 3 21 3zM15 11h6v2h-6v-2zm0 4h6v2h-6v-2zM3 17h8v2H3v-2zm0-4h8v2H3v-2zm0-4h8v2H3V9z",
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
    ...{ class: "card-title" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ onClick: (__VLS_ctx.gotoRevenue) },
    ...{ class: "dashboard-card revenue-card" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "card-content" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.svg, __VLS_intrinsicElements.svg)({
    ...{ class: "card-icon" },
    viewBox: "0 0 24 24",
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.path)({
    fill: "#FFC107",
    d: "M22 11V9L12 2L2 9v2h2v9c0 .55.45 1 1 1h16c.55 0 1-.45 1-1v-9h2zm-4 8h-4v-4h4v4zm-6 0h-4v-4h4v4zm-6 0H4v-4h4v4zM4 11l8-5.5L20 11H4z",
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
    ...{ class: "card-title" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "dashboard-card expenses-card" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "card-content" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.svg, __VLS_intrinsicElements.svg)({
    ...{ class: "card-icon" },
    viewBox: "0 0 24 24",
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.path)({
    fill: "#03A9F4",
    d: "M13 16v-2h-1v-4h1V8h3l-4-4-4 4h3v2h-1v4h1v2H4v3c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2v-3h-5z",
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
    ...{ class: "card-title" },
});
if (__VLS_ctx.showTaskMenuOverlay) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ onClick: (__VLS_ctx.closeTaskMenu) },
        ...{ class: "task-menu-overlay" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "task-menu" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
        ...{ onClick: (__VLS_ctx.goToAssessmentReviewPage) },
        ...{ class: "task-menu-button" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
        ...{ onClick: (__VLS_ctx.goToEmployeeListFromTask) },
        ...{ class: "task-menu-button" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
        ...{ onClick: (__VLS_ctx.goToSalaryManagement) },
        ...{ class: "task-menu-button" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
        ...{ onClick: (__VLS_ctx.closeTaskMenu) },
        ...{ class: "task-menu-button" },
    });
}
/** @type {__VLS_StyleScopedClasses['owner-dashboard']} */ ;
/** @type {__VLS_StyleScopedClasses['dashboard-header']} */ ;
/** @type {__VLS_StyleScopedClasses['logout-button']} */ ;
/** @type {__VLS_StyleScopedClasses['search-bar']} */ ;
/** @type {__VLS_StyleScopedClasses['search-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['dashboard-content']} */ ;
/** @type {__VLS_StyleScopedClasses['dashboard-card']} */ ;
/** @type {__VLS_StyleScopedClasses['task-card']} */ ;
/** @type {__VLS_StyleScopedClasses['card-content']} */ ;
/** @type {__VLS_StyleScopedClasses['card-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['large']} */ ;
/** @type {__VLS_StyleScopedClasses['card-title']} */ ;
/** @type {__VLS_StyleScopedClasses['dashboard-card']} */ ;
/** @type {__VLS_StyleScopedClasses['employees-card']} */ ;
/** @type {__VLS_StyleScopedClasses['card-content']} */ ;
/** @type {__VLS_StyleScopedClasses['card-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['card-title']} */ ;
/** @type {__VLS_StyleScopedClasses['dashboard-card']} */ ;
/** @type {__VLS_StyleScopedClasses['approval-card']} */ ;
/** @type {__VLS_StyleScopedClasses['card-content']} */ ;
/** @type {__VLS_StyleScopedClasses['card-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['card-title']} */ ;
/** @type {__VLS_StyleScopedClasses['dashboard-card']} */ ;
/** @type {__VLS_StyleScopedClasses['revenue-card']} */ ;
/** @type {__VLS_StyleScopedClasses['card-content']} */ ;
/** @type {__VLS_StyleScopedClasses['card-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['card-title']} */ ;
/** @type {__VLS_StyleScopedClasses['dashboard-card']} */ ;
/** @type {__VLS_StyleScopedClasses['expenses-card']} */ ;
/** @type {__VLS_StyleScopedClasses['card-content']} */ ;
/** @type {__VLS_StyleScopedClasses['card-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['card-title']} */ ;
/** @type {__VLS_StyleScopedClasses['task-menu-overlay']} */ ;
/** @type {__VLS_StyleScopedClasses['task-menu']} */ ;
/** @type {__VLS_StyleScopedClasses['task-menu-button']} */ ;
/** @type {__VLS_StyleScopedClasses['task-menu-button']} */ ;
/** @type {__VLS_StyleScopedClasses['task-menu-button']} */ ;
/** @type {__VLS_StyleScopedClasses['task-menu-button']} */ ;
var __VLS_dollars;
let __VLS_self;
//# sourceMappingURL=Dashboard.vue.js.map