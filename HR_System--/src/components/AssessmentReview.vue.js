export default (await import('vue')).defineComponent({
    data() {
        return {
            employees: [],
            assessmentData: {},
            loading: true,
            error: null,
            searchQuery: '',
            selectedEmployee: null,
        };
    },
    computed: {
        filteredEmployees() {
            return this.employees.filter(employee => employee.name.toLowerCase().includes(this.searchQuery.toLowerCase()));
        },
    },
    methods: {
        async fetchAssessmentData() {
            this.loading = true;
            this.error = null;
            try {
                // จำลองการดึงข้อมูลจาก API
                const response = await new Promise((resolve) => {
                    setTimeout(() => {
                        resolve({
                            employees: [
                                { name: "ณัฐพงษ์", position: "Developer", period: "Q3/2025", status: "ส่งแล้ว", actionIcon: "🔍" },
                                { name: "วรรณวิภา", position: "HR Executive", period: "Q3/2025", status: "ยังไม่ส่ง", actionIcon: "🔒" },
                                { name: "ชญานิษฐ์", position: "Designer", period: "Q2/2025", status: "ส่งแล้ว", actionIcon: "🔍" },
                            ],
                            assessmentData: {
                                "ณัฐพงษ์": [
                                    ["ความรับผิดชอบในงาน", 4, 4],
                                    ["การทำงานร่วมกับคนอื่น", 5, 5],
                                    ["การออกความคิดเห็น", 4, 4],
                                    ["ข้อเสนอแนะในการพัฒนา", 4, 4]
                                ],
                                "ชญานิษฐ์": [
                                    ["ความรับผิดชอบในงาน", 3, "-"],
                                    ["การทำงานร่วมกับคนอื่น", 2, "-"],
                                    ["การออกความคิดเห็น", 3, "-"],
                                    ["ข้อเสนอแนะในการพัฒนา", 4, "-"]
                                ]
                            }
                        });
                    }, 1000); // จำลองเวลาในการโหลด 1 วินาที
                });
                this.employees = response.employees;
                this.assessmentData = response.assessmentData;
            }
            catch (err) {
                this.error = err;
            }
            finally {
                this.loading = false;
            }
        },
        goToAssessmentDetail(name) {
            this.selectedEmployee = name;
        },
        closeAssessmentDetail() {
            this.selectedEmployee = null;
        },
        goBackToDashboard() {
            this.$emit('go-back-to-dashboard');
        },
    },
    mounted() {
        this.fetchAssessmentData();
    },
});
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['assessment-review-header']} */ ;
/** @type {__VLS_StyleScopedClasses['assessment-detail-container']} */ ;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "assessment-review-container" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.header, __VLS_intrinsicElements.header)({
    ...{ class: "assessment-review-header" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
    ...{ onClick: (__VLS_ctx.goBackToDashboard) },
    ...{ class: "assessment-review-back-button" },
});
if (__VLS_ctx.loading) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "assessment-review-loading" },
    });
}
else if (__VLS_ctx.error) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "assessment-review-error" },
    });
    (__VLS_ctx.error);
}
else {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "assessment-review-content" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.input, __VLS_intrinsicElements.input)({
        type: "text",
        value: (__VLS_ctx.searchQuery),
        placeholder: "ค้นหาพนักงาน",
        ...{ class: "assessment-review-search-input" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.table, __VLS_intrinsicElements.table)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.thead, __VLS_intrinsicElements.thead)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.tr, __VLS_intrinsicElements.tr)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.tbody, __VLS_intrinsicElements.tbody)({});
    for (const [employee] of __VLS_getVForSourceType((__VLS_ctx.filteredEmployees))) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.tr, __VLS_intrinsicElements.tr)({
            key: (employee.name),
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({});
        (employee.name);
        __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({});
        (employee.position);
        __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({});
        (employee.period);
        __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({});
        (employee.status);
        __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({});
        __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
            ...{ onClick: (...[$event]) => {
                    if (!!(__VLS_ctx.loading))
                        return;
                    if (!!(__VLS_ctx.error))
                        return;
                    __VLS_ctx.goToAssessmentDetail(employee.name);
                } },
            ...{ class: "assessment-review-detail-button" },
        });
        (employee.actionIcon);
    }
}
if (__VLS_ctx.selectedEmployee) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "assessment-detail-overlay" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "assessment-detail-container" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
    (__VLS_ctx.selectedEmployee);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.table, __VLS_intrinsicElements.table)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.thead, __VLS_intrinsicElements.thead)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.tr, __VLS_intrinsicElements.tr)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.tbody, __VLS_intrinsicElements.tbody)({});
    for (const [row, index] of __VLS_getVForSourceType((__VLS_ctx.assessmentData[__VLS_ctx.selectedEmployee]))) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.tr, __VLS_intrinsicElements.tr)({
            key: (index),
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({});
        (row[0]);
        __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({});
        (row[1]);
        __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({});
        (row[2]);
    }
    __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
        ...{ onClick: (__VLS_ctx.closeAssessmentDetail) },
        ...{ class: "assessment-detail-close-button" },
    });
}
/** @type {__VLS_StyleScopedClasses['assessment-review-container']} */ ;
/** @type {__VLS_StyleScopedClasses['assessment-review-header']} */ ;
/** @type {__VLS_StyleScopedClasses['assessment-review-back-button']} */ ;
/** @type {__VLS_StyleScopedClasses['assessment-review-loading']} */ ;
/** @type {__VLS_StyleScopedClasses['assessment-review-error']} */ ;
/** @type {__VLS_StyleScopedClasses['assessment-review-content']} */ ;
/** @type {__VLS_StyleScopedClasses['assessment-review-search-input']} */ ;
/** @type {__VLS_StyleScopedClasses['assessment-review-detail-button']} */ ;
/** @type {__VLS_StyleScopedClasses['assessment-detail-overlay']} */ ;
/** @type {__VLS_StyleScopedClasses['assessment-detail-container']} */ ;
/** @type {__VLS_StyleScopedClasses['assessment-detail-close-button']} */ ;
var __VLS_dollars;
let __VLS_self;
//# sourceMappingURL=AssessmentReview.vue.js.map