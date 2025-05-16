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
    }
    catch (err) {
        error.value = err.message || 'Unknown error';
    }
    finally {
        loading.value = false;
    }
}
onMounted(() => {
    fetchRevenueData();
});
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['revenue-table']} */ ;
/** @type {__VLS_StyleScopedClasses['revenue-table']} */ ;
/** @type {__VLS_StyleScopedClasses['revenue-table']} */ ;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "revenue-container" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({});
if (__VLS_ctx.loading) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "loading" },
    });
}
else if (__VLS_ctx.error) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "error" },
    });
    (__VLS_ctx.error);
}
else {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.table, __VLS_intrinsicElements.table)({
        ...{ class: "revenue-table" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.thead, __VLS_intrinsicElements.thead)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.tr, __VLS_intrinsicElements.tr)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.tbody, __VLS_intrinsicElements.tbody)({});
    for (const [branch] of __VLS_getVForSourceType((__VLS_ctx.revenues))) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.tr, __VLS_intrinsicElements.tr)({
            key: (branch.branch),
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({});
        (branch.branch);
        __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({
            ...{ class: "amount" },
        });
        (__VLS_ctx.formatCurrency(branch.revenue));
    }
    __VLS_asFunctionalElement(__VLS_intrinsicElements.tfoot, __VLS_intrinsicElements.tfoot)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.tr, __VLS_intrinsicElements.tr)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({
        ...{ class: "amount" },
    });
    (__VLS_ctx.formatCurrency(__VLS_ctx.totalRevenue));
}
/** @type {__VLS_StyleScopedClasses['revenue-container']} */ ;
/** @type {__VLS_StyleScopedClasses['loading']} */ ;
/** @type {__VLS_StyleScopedClasses['error']} */ ;
/** @type {__VLS_StyleScopedClasses['revenue-table']} */ ;
/** @type {__VLS_StyleScopedClasses['amount']} */ ;
/** @type {__VLS_StyleScopedClasses['amount']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            revenues: revenues,
            loading: loading,
            error: error,
            totalRevenue: totalRevenue,
            formatCurrency: formatCurrency,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
//# sourceMappingURL=Revenue.vue.js.map