import { jsPDF } from "jspdf";
import axios from "axios";
export default (await import('vue')).defineComponent({
    data() {
        return {
            employees: [],
            editIndex: null,
            editedSalary: null,
        };
    },
    computed: {
        totalSalary() {
            return this.employees.reduce((sum, emp) => {
                const salaryNum = parseFloat(emp.salary);
                return sum + (isNaN(salaryNum) ? 0 : salaryNum);
            }, 0);
        },
    },
    methods: {
        async fetchSalaries() {
            try {
                const res = await axios.get("http://127.0.0.1/HrSystem_project/Human-Resource-Management-System_System_Analysis_and_Design_Project/HR_System--/api/salaries/get_all_salaries.php");
                this.employees = res.data;
            }
            catch (err) {
                console.error("โหลดข้อมูลเงินเดือนไม่สำเร็จ", err);
            }
        },
        startEdit(index) {
            this.editIndex = index;
            this.editedSalary = this.employees[index].salary;
        },
        async saveEdit(index) {
            const emp = this.employees[index];
            if (this.editedSalary !== null && this.editedSalary >= 0) {
                try {
                    await axios.post("http://127.0.0.1/HrSystem_project/Human-Resource-Management-System_System_Analysis_and_Design_Project/HR_System--/api/salaries/update_salary.php", {
                        id: emp.id,
                        salary: this.editedSalary,
                    });
                    emp.salary = this.editedSalary;
                    this.editIndex = null;
                    this.editedSalary = null;
                }
                catch (err) {
                    console.error("อัปเดตเงินเดือนไม่สำเร็จ", err);
                }
            }
        },
        cancelEdit() {
            this.editIndex = null;
            this.editedSalary = null;
        },
        onSalaryInput(e) {
            // Optional: allow only numbers (and maybe decimals)
            const val = e.target.value.replace(/[^\d.]/g, "");
            this.editedSalary = val;
        },
        printPdf() {
            const doc = new jsPDF();
            doc.setFontSize(16);
            doc.text("รายงานเงินเดือนพนักงาน", 14, 20);
            let y = 30;
            doc.setFontSize(12);
            doc.text("รหัสพนักงาน", 14, y);
            doc.text("ชื่อพนักงาน", 60, y);
            doc.text("เงินเดือน (บาท)", 140, y);
            y += 8;
            this.employees.forEach((emp) => {
                doc.text(emp.id.toString(), 14, y);
                doc.text(emp.name, 60, y);
                doc.text(Number(emp.salary).toLocaleString(), 140, y, { align: "right" });
                y += 8;
            });
            y += 10;
            doc.setFontSize(14);
            doc.text(`เงินเดือนรวมทั้งหมด: ${this.totalSalary.toLocaleString()} บาท`, 14, y);
            doc.save("salary-report.pdf");
        },
        goToDashboard() {
            this.$router.push('/dashboard');
        }
    },
    mounted() {
        this.fetchSalaries();
    },
});
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['btn-back']} */ ;
/** @type {__VLS_StyleScopedClasses['salary-table']} */ ;
/** @type {__VLS_StyleScopedClasses['salary-table']} */ ;
/** @type {__VLS_StyleScopedClasses['salary-table']} */ ;
/** @type {__VLS_StyleScopedClasses['salary-table']} */ ;
/** @type {__VLS_StyleScopedClasses['print-button']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-edit']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-save']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-cancel']} */ ;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "salary-management-container" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.header, __VLS_intrinsicElements.header)({
    ...{ class: "page-header" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
    ...{ onClick: (__VLS_ctx.goToDashboard) },
    ...{ class: "btn-back" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "table-wrapper" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.table, __VLS_intrinsicElements.table)({
    ...{ class: "salary-table" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.thead, __VLS_intrinsicElements.thead)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.tr, __VLS_intrinsicElements.tr)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.tbody, __VLS_intrinsicElements.tbody)({});
for (const [employee, index] of __VLS_getVForSourceType((__VLS_ctx.employees))) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.tr, __VLS_intrinsicElements.tr)({
        key: (employee.id),
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({});
    (employee.id);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({});
    (employee.name);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({});
    if (__VLS_ctx.editIndex === index) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
        __VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
            ...{ onInput: (__VLS_ctx.onSalaryInput) },
            value: (__VLS_ctx.editedSalary),
            type: "text",
            ...{ class: "salary-input" },
        });
    }
    else {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
        (Number(employee.salary).toLocaleString());
    }
    __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({});
    if (__VLS_ctx.editIndex !== index) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
            ...{ onClick: (...[$event]) => {
                    if (!(__VLS_ctx.editIndex !== index))
                        return;
                    __VLS_ctx.startEdit(index);
                } },
            ...{ class: "btn-edit" },
        });
    }
    else {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
            ...{ onClick: (...[$event]) => {
                    if (!!(__VLS_ctx.editIndex !== index))
                        return;
                    __VLS_ctx.saveEdit(index);
                } },
            ...{ class: "btn-save" },
        });
    }
    if (__VLS_ctx.editIndex === index) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
            ...{ onClick: (__VLS_ctx.cancelEdit) },
            ...{ class: "btn-cancel" },
        });
    }
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.tfoot, __VLS_intrinsicElements.tfoot)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.tr, __VLS_intrinsicElements.tr)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({
    colspan: "2",
    ...{ style: {} },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({
    colspan: "2",
    ...{ style: {} },
});
(__VLS_ctx.totalSalary.toLocaleString());
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
    ...{ onClick: (__VLS_ctx.printPdf) },
    ...{ class: "print-button" },
});
/** @type {__VLS_StyleScopedClasses['salary-management-container']} */ ;
/** @type {__VLS_StyleScopedClasses['page-header']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-back']} */ ;
/** @type {__VLS_StyleScopedClasses['table-wrapper']} */ ;
/** @type {__VLS_StyleScopedClasses['salary-table']} */ ;
/** @type {__VLS_StyleScopedClasses['salary-input']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-edit']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-save']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-cancel']} */ ;
/** @type {__VLS_StyleScopedClasses['print-button']} */ ;
var __VLS_dollars;
let __VLS_self;
//# sourceMappingURL=SalaryManagement.vue.js.map