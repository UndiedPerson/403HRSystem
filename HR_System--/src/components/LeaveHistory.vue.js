import axios from 'axios';
const API_URL = 'http://127.0.0.1/HrSystem_project/Human-Resource-Management-System_System_Analysis_and_Design_Project/HR_System--/api/leave_request/get_leave_history.php';
export default (await import('vue')).defineComponent({
    name: 'LeaveHistory',
    props: {
        theme: {
            type: Object,
            default: () => ({
                headerBackground: '#840CFE',
                headerTextColor: 'white',
                cardBorderColor: '#CCCCCC',
            }),
        },
    },
    data() {
        return {
            approvedLeaves: [],
            loading: false,
            error: null,
        };
    },
    methods: {
        async fetchApprovedLeaves() {
            this.loading = true;
            this.error = null;
            try {
                const response = await axios.get(API_URL);
                this.approvedLeaves = response.data.filter(leave => leave.status === 'approved');
            }
            catch (err) {
                console.error('Error fetching leave data:', err);
                this.error = 'ไม่สามารถโหลดประวัติการลาได้';
            }
            finally {
                this.loading = false;
            }
        },
        goToDashboard() {
            this.$router.push('/dashboard');
        },
    },
    mounted() {
        this.fetchApprovedLeaves();
    },
});
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['nav-tab']} */ ;
/** @type {__VLS_StyleScopedClasses['leave-table']} */ ;
/** @type {__VLS_StyleScopedClasses['leave-table']} */ ;
/** @type {__VLS_StyleScopedClasses['leave-table']} */ ;
/** @type {__VLS_StyleScopedClasses['leave-table']} */ ;
/** @type {__VLS_StyleScopedClasses['dashboard-button']} */ ;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "leave-history-container" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "header" },
    ...{ style: ({ backgroundColor: __VLS_ctx.theme.headerBackground, color: __VLS_ctx.theme.headerTextColor, position: 'relative' }) },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
    ...{ onClick: (__VLS_ctx.goToDashboard) },
    ...{ class: "dashboard-button" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "navigation-tabs" },
});
const __VLS_0 = {}.RouterLink;
/** @type {[typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, ]} */ ;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    to: "/employees",
}));
const __VLS_2 = __VLS_1({
    to: "/employees",
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
__VLS_3.slots.default;
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
    ...{ class: "nav-tab" },
});
var __VLS_3;
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
    ...{ class: "nav-tab active" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
    ...{ class: "nav-tab" },
});
if (__VLS_ctx.loading) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
}
if (__VLS_ctx.error) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "error" },
    });
    (__VLS_ctx.error);
}
if (__VLS_ctx.approvedLeaves.length === 0 && !__VLS_ctx.loading) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "no-results" },
    });
}
else {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.table, __VLS_intrinsicElements.table)({
        ...{ class: "leave-table" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.thead, __VLS_intrinsicElements.thead)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.tr, __VLS_intrinsicElements.tr)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.tbody, __VLS_intrinsicElements.tbody)({});
    for (const [leave] of __VLS_getVForSourceType((__VLS_ctx.approvedLeaves))) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.tr, __VLS_intrinsicElements.tr)({
            key: (leave.LeaveID),
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({});
        (leave.LeaveID);
        __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({});
        (leave.name);
        __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({});
        (leave.leave_type);
        __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({});
        (leave.start_date);
        (leave.end_date);
        __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({});
        (leave.reason);
        __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({
            ...{ class: "status-approved" },
        });
    }
}
/** @type {__VLS_StyleScopedClasses['leave-history-container']} */ ;
/** @type {__VLS_StyleScopedClasses['header']} */ ;
/** @type {__VLS_StyleScopedClasses['dashboard-button']} */ ;
/** @type {__VLS_StyleScopedClasses['navigation-tabs']} */ ;
/** @type {__VLS_StyleScopedClasses['nav-tab']} */ ;
/** @type {__VLS_StyleScopedClasses['nav-tab']} */ ;
/** @type {__VLS_StyleScopedClasses['active']} */ ;
/** @type {__VLS_StyleScopedClasses['nav-tab']} */ ;
/** @type {__VLS_StyleScopedClasses['error']} */ ;
/** @type {__VLS_StyleScopedClasses['no-results']} */ ;
/** @type {__VLS_StyleScopedClasses['leave-table']} */ ;
/** @type {__VLS_StyleScopedClasses['status-approved']} */ ;
var __VLS_dollars;
let __VLS_self;
//# sourceMappingURL=LeaveHistory.vue.js.map