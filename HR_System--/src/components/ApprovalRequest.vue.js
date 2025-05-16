import axios from "axios";
export default (await import('vue')).defineComponent({
    data() {
        return {
            requests: [],
            loading: false,
            error: null,
            message: null,
        };
    },
    methods: {
        async fetchRequests() {
            this.loading = true;
            this.error = null;
            this.message = null;
            try {
                const res = await axios.get("http://127.0.0.1/HrSystem_project/Human-Resource-Management-System_System_Analysis_and_Design_Project/HR_System--/api/leave_request/get_all_leave_requests.php");
                if (Array.isArray(res.data)) {
                    this.requests = res.data.sort((a, b) => {
                        // ให้ waiting ขึ้นก่อน
                        if (a.status === "waiting" && b.status !== "waiting")
                            return -1;
                        if (a.status !== "waiting" && b.status === "waiting")
                            return 1;
                        // ถ้า status เหมือนกัน ให้เรียงตาม LeaveID
                        return a.LeaveID - b.LeaveID;
                    });
                }
                else {
                    this.requests = [];
                }
            }
            catch (err) {
                this.error = "ไม่สามารถโหลดข้อมูลได้";
                console.error(err);
            }
            finally {
                this.loading = false;
            }
        },
        async updateStatus(LeaveID, status) {
            this.error = null;
            this.message = null;
            try {
                const res = await axios.post("http://127.0.0.1/HrSystem_project/Human-Resource-Management-System_System_Analysis_and_Design_Project/HR_System--/api/leave_request/update_leave_status.php", JSON.stringify({ LeaveID: Number(LeaveID), status }), {
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                this.message = res.data.message;
                this.fetchRequests();
            }
            catch (err) {
                this.error = err.response?.data?.message || "ไม่สามารถอัปเดตสถานะได้";
                console.error(err);
            }
        },
        goToDashboard() {
            this.$router.push('/dashboard');
        },
    },
    mounted() {
        this.fetchRequests();
    },
});
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['dashboard-button']} */ ;
/** @type {__VLS_StyleScopedClasses['leave-table']} */ ;
/** @type {__VLS_StyleScopedClasses['leave-table']} */ ;
/** @type {__VLS_StyleScopedClasses['leave-table']} */ ;
/** @type {__VLS_StyleScopedClasses['leave-table']} */ ;
/** @type {__VLS_StyleScopedClasses['approve-button']} */ ;
/** @type {__VLS_StyleScopedClasses['decline-button']} */ ;
/** @type {__VLS_StyleScopedClasses['approve-button']} */ ;
/** @type {__VLS_StyleScopedClasses['decline-button']} */ ;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "approval-request-container" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
    ...{ onClick: (__VLS_ctx.goToDashboard) },
    ...{ class: "dashboard-button" },
});
if (__VLS_ctx.loading) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "loading" },
    });
}
if (__VLS_ctx.error) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "error" },
    });
    (__VLS_ctx.error);
}
if (__VLS_ctx.message) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "message" },
    });
    (__VLS_ctx.message);
}
if (__VLS_ctx.requests.length > 0) {
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
    __VLS_asFunctionalElement(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.tbody, __VLS_intrinsicElements.tbody)({});
    for (const [leave] of __VLS_getVForSourceType((__VLS_ctx.requests))) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.tr, __VLS_intrinsicElements.tr)({
            key: (leave.LeaveID),
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({});
        (leave.LeaveID);
        __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({});
        (leave.name);
        (leave.id);
        __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({});
        (leave.leave_type);
        __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({});
        (leave.start_date);
        (leave.end_date);
        __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({});
        (leave.reason);
        __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({});
        (leave.status);
        __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({});
        if (leave.status === 'waiting') {
            __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
                ...{ onClick: (...[$event]) => {
                        if (!(__VLS_ctx.requests.length > 0))
                            return;
                        if (!(leave.status === 'waiting'))
                            return;
                        __VLS_ctx.updateStatus(leave.LeaveID, 'approved');
                    } },
                ...{ class: "approve-button" },
            });
        }
        if (leave.status === 'waiting') {
            __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
                ...{ onClick: (...[$event]) => {
                        if (!(__VLS_ctx.requests.length > 0))
                            return;
                        if (!(leave.status === 'waiting'))
                            return;
                        __VLS_ctx.updateStatus(leave.LeaveID, 'declined');
                    } },
                ...{ class: "decline-button" },
            });
        }
        else {
            __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
        }
    }
}
else if (!__VLS_ctx.loading) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "no-data" },
    });
}
/** @type {__VLS_StyleScopedClasses['approval-request-container']} */ ;
/** @type {__VLS_StyleScopedClasses['dashboard-button']} */ ;
/** @type {__VLS_StyleScopedClasses['loading']} */ ;
/** @type {__VLS_StyleScopedClasses['error']} */ ;
/** @type {__VLS_StyleScopedClasses['message']} */ ;
/** @type {__VLS_StyleScopedClasses['leave-table']} */ ;
/** @type {__VLS_StyleScopedClasses['approve-button']} */ ;
/** @type {__VLS_StyleScopedClasses['decline-button']} */ ;
/** @type {__VLS_StyleScopedClasses['no-data']} */ ;
var __VLS_dollars;
let __VLS_self;
//# sourceMappingURL=ApprovalRequest.vue.js.map