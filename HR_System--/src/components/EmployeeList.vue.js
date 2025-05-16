import EmployeeForm from './EmployeeForm.vue';
import axios from 'axios';
const API_BASE = 'http://127.0.0.1/HrSystem_project/Human-Resource-Management-System_System_Analysis_and_Design_Project/HR_System--/api/employees/';
export default (await import('vue')).defineComponent({
    components: { EmployeeForm },
    props: {
        theme: {
            type: Object,
            default: () => ({
                headerBackground: '#840CFE',
                headerTextColor: 'white',
                inputBackground: '#EFEFEF',
                inputTextColor: '#333',
                inputBorderColor: '#CCCCCC',
                inputBoxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                addButtonBackground: '#840CFE',
                addButtonTextColor: 'white',
                addButtonBoxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
                cardBorderColor: '#CCCCCC',
                editButtonBackground: '#0192D9',
                editButtonTextColor: 'white',
                editButtonBoxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
                deleteButtonBackground: '#FF0000',
                deleteButtonTextColor: 'white',
                deleteButtonBoxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
            }),
        },
    },
    data() {
        return {
            employees: [],
            searchQuery: '',
            showForm: false,
            selectedEmployee: null,
            loading: false,
            error: null,
            showDeleteModal: false,
            deleteConfirmationText: '',
            employeeToDelete: null,
            deleteError: '',
            autoRefresh: null,
        };
    },
    computed: {
        filteredEmployees() {
            if (!this.searchQuery)
                return this.employees;
            return this.employees.filter(employee => employee.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                employee.position.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                employee.branch.toLowerCase().includes(this.searchQuery.toLowerCase()));
        }
    },
    methods: {
        async fetchEmployees() {
            this.loading = true;
            this.error = null;
            try {
                const response = await axios.get(`${API_BASE}read.php`);
                this.employees = response.data;
            }
            catch (err) {
                this.error = 'ไม่สามารถโหลดข้อมูลพนักงานได้';
            }
            finally {
                this.loading = false;
            }
        },
        async searchEmployees() {
            if (!this.searchQuery.trim()) {
                this.fetchEmployees();
                return;
            }
            this.loading = true;
            this.error = null;
            try {
                const response = await axios.get(`${API_BASE}read_one.php?search=${this.searchQuery}`);
                this.employees = response.data;
            }
            catch (err) {
                this.error = 'ไม่สามารถค้นหาข้อมูลพนักงานได้';
            }
            finally {
                this.loading = false;
            }
        },
        openDeleteModal(employee) {
            this.employeeToDelete = employee;
            this.showDeleteModal = true;
            this.deleteConfirmationText = '';
            this.deleteError = '';
        },
        cancelDelete() {
            this.showDeleteModal = false;
            this.deleteConfirmationText = '';
            this.employeeToDelete = null;
            this.deleteError = '';
        },
        async confirmDelete() {
            if (this.deleteConfirmationText === 'DELETE THIS EMPLOYEE') {
                try {
                    const response = await axios.post(`${API_BASE}delete.php`, {
                        id: this.employeeToDelete.id,
                        confirm: this.deleteConfirmationText // ส่งคำยืนยันไปในคำขอ
                    });
                    if (response.data.success) {
                        this.fetchEmployees(); // รีเฟรชข้อมูลพนักงาน
                        this.cancelDelete(); // ปิด modal
                    }
                    else {
                        this.deleteError = response.data.message; // แสดงข้อความข้อผิดพลาดจาก PHP
                    }
                }
                catch (error) {
                    console.error('Error deleting employee:', error);
                    this.deleteError = 'เกิดข้อผิดพลาดในการลบพนักงาน';
                }
            }
            else {
                this.deleteError = 'กรุณาพิมพ์ "DELETE THIS EMPLOYEE" เพื่อยืนยันการลบ';
            }
        },
        editEmployee(employee) {
            // Create a copy of the employee data without the status field
            this.selectedEmployee = { ...employee };
            delete this.selectedEmployee.status; // Exclude the status field
            this.showForm = true;
        },
        openAddForm() {
            this.selectedEmployee = null;
            this.showForm = true;
        },
        closeForm() {
            this.showForm = false;
            this.selectedEmployee = null;
        },
        goToDashboard() {
            this.$router.push('/dashboard');
        },
    },
    mounted() {
        this.fetchEmployees();
        this.autoRefresh = setInterval(this.fetchEmployees, 5000);
    },
    beforeUnmount() {
        clearInterval(this.autoRefresh);
    }
});
const __VLS_ctx = {};
const __VLS_componentsOption = { EmployeeForm };
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['nav-tab']} */ ;
/** @type {__VLS_StyleScopedClasses['list-controls']} */ ;
/** @type {__VLS_StyleScopedClasses['list-controls']} */ ;
/** @type {__VLS_StyleScopedClasses['employee-actions']} */ ;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "employee-list-container" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "header" },
    ...{ style: ({ backgroundColor: __VLS_ctx.theme.headerBackground, color: __VLS_ctx.theme.headerTextColor }) },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
    ...{ onClick: (__VLS_ctx.goToDashboard) },
    ...{ class: "dashboard-button" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "navigation-tabs" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
    ...{ class: "nav-tab active" },
});
const __VLS_0 = {}.RouterLink;
/** @type {[typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, ]} */ ;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    to: "/leave-history",
}));
const __VLS_2 = __VLS_1({
    to: "/leave-history",
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
__VLS_3.slots.default;
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
    ...{ class: "nav-tab" },
});
var __VLS_3;
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
    ...{ class: "nav-tab" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "list-controls" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.input, __VLS_intrinsicElements.input)({
    type: "text",
    value: (__VLS_ctx.searchQuery),
    placeholder: "ค้นหาพนักงาน...",
    ...{ style: ({ backgroundColor: __VLS_ctx.theme.inputBackground, color: __VLS_ctx.theme.inputTextColor, borderColor: __VLS_ctx.theme.inputBorderColor, boxShadow: __VLS_ctx.theme.inputBoxShadow }) },
    ...{ class: "search-input" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
    ...{ onClick: (__VLS_ctx.searchEmployees) },
    ...{ style: ({ backgroundColor: __VLS_ctx.theme.addButtonBackground, color: __VLS_ctx.theme.addButtonTextColor, boxShadow: __VLS_ctx.theme.addButtonBoxShadow }) },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
    ...{ onClick: (__VLS_ctx.openAddForm) },
    ...{ style: ({ backgroundColor: __VLS_ctx.theme.addButtonBackground, color: __VLS_ctx.theme.addButtonTextColor, boxShadow: __VLS_ctx.theme.addButtonBoxShadow }) },
});
if (__VLS_ctx.loading) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
}
if (__VLS_ctx.error) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
    (__VLS_ctx.error);
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "employee-cards" },
});
for (const [employee] of __VLS_getVForSourceType((__VLS_ctx.filteredEmployees))) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        key: (employee.id),
        ...{ class: "employee-card" },
        ...{ style: ({ borderColor: __VLS_ctx.theme.cardBorderColor }) },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "employee-avatar" },
    });
    if (employee.image_path) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.img)({
            src: (employee.image_path),
            alt: "Profile",
        });
    }
    else {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.svg, __VLS_intrinsicElements.svg)({
            viewBox: "0 0 24 24",
            fill: "currentColor",
            width: "48",
            height: "48",
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.path)({
            d: "M12 4a4 4 0 0 1 4 4 4 4 0 0 1-4 4 4 4 0 0 1-4-4 4 4 0 0 1 4-4m0 10c4.42 0 8 1.79 8 4v2H4v-2c0-2.21 3.58-4 8-4z",
        });
    }
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "employee-details" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "employee-name" },
    });
    (employee.name);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "employee-position" },
    });
    (employee.position);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "employee-email" },
    });
    (employee.email);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "employee-status" },
    });
    (employee.status || 'Active');
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "employee-branch" },
    });
    (employee.branch);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "employee-hire-date" },
    });
    (employee.hire_date);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "employee-actions" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
        ...{ onClick: (...[$event]) => {
                __VLS_ctx.editEmployee(employee);
            } },
        ...{ style: ({ backgroundColor: __VLS_ctx.theme.editButtonBackground, color: __VLS_ctx.theme.editButtonTextColor, boxShadow: __VLS_ctx.theme.editButtonBoxShadow }) },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
        ...{ onClick: (...[$event]) => {
                __VLS_ctx.openDeleteModal(employee);
            } },
        ...{ style: ({ backgroundColor: __VLS_ctx.theme.deleteButtonBackground, color: __VLS_ctx.theme.deleteButtonTextColor, boxShadow: __VLS_ctx.theme.deleteButtonBoxShadow }) },
    });
}
if (!__VLS_ctx.filteredEmployees.length && !__VLS_ctx.loading && !__VLS_ctx.error) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "no-results" },
    });
}
if (__VLS_ctx.showForm) {
    const __VLS_4 = {}.EmployeeForm;
    /** @type {[typeof __VLS_components.EmployeeForm, ]} */ ;
    // @ts-ignore
    const __VLS_5 = __VLS_asFunctionalComponent(__VLS_4, new __VLS_4({
        ...{ 'onEmployeeSaved': {} },
        ...{ 'onClose': {} },
        employee: (__VLS_ctx.selectedEmployee),
        theme: (__VLS_ctx.theme),
    }));
    const __VLS_6 = __VLS_5({
        ...{ 'onEmployeeSaved': {} },
        ...{ 'onClose': {} },
        employee: (__VLS_ctx.selectedEmployee),
        theme: (__VLS_ctx.theme),
    }, ...__VLS_functionalComponentArgsRest(__VLS_5));
    let __VLS_8;
    let __VLS_9;
    let __VLS_10;
    const __VLS_11 = {
        onEmployeeSaved: (__VLS_ctx.fetchEmployees)
    };
    const __VLS_12 = {
        onClose: (__VLS_ctx.closeForm)
    };
    var __VLS_7;
}
if (__VLS_ctx.showDeleteModal) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "modal-overlay" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "modal-content" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "modal-header" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
    if (__VLS_ctx.employeeToDelete) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
        __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
        __VLS_asFunctionalElement(__VLS_intrinsicElements.strong, __VLS_intrinsicElements.strong)({});
        (__VLS_ctx.employeeToDelete.id);
        __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
        __VLS_asFunctionalElement(__VLS_intrinsicElements.strong, __VLS_intrinsicElements.strong)({});
        (__VLS_ctx.employeeToDelete.name);
        __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
        __VLS_asFunctionalElement(__VLS_intrinsicElements.strong, __VLS_intrinsicElements.strong)({});
        (__VLS_ctx.employeeToDelete.position);
        __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
        __VLS_asFunctionalElement(__VLS_intrinsicElements.strong, __VLS_intrinsicElements.strong)({});
        (__VLS_ctx.employeeToDelete.email);
    }
    __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.strong, __VLS_intrinsicElements.strong)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
        type: "text",
        value: (__VLS_ctx.deleteConfirmationText),
        ...{ class: ({ 'invalid-input': __VLS_ctx.deleteConfirmationText && __VLS_ctx.deleteConfirmationText !== 'DELETE THIS EMPLOYEE' }) },
        placeholder: 'พิมพ์ "DELETE THIS EMPLOYEE"',
    });
    if (__VLS_ctx.deleteError) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
            ...{ class: "error-text" },
        });
        (__VLS_ctx.deleteError);
    }
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "modal-actions" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
        ...{ onClick: (__VLS_ctx.cancelDelete) },
        ...{ class: "cancel-button" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
        ...{ onClick: (__VLS_ctx.confirmDelete) },
        ...{ class: "confirm-button" },
        disabled: (__VLS_ctx.deleteConfirmationText !== 'DELETE THIS EMPLOYEE'),
    });
}
/** @type {__VLS_StyleScopedClasses['employee-list-container']} */ ;
/** @type {__VLS_StyleScopedClasses['header']} */ ;
/** @type {__VLS_StyleScopedClasses['dashboard-button']} */ ;
/** @type {__VLS_StyleScopedClasses['navigation-tabs']} */ ;
/** @type {__VLS_StyleScopedClasses['nav-tab']} */ ;
/** @type {__VLS_StyleScopedClasses['active']} */ ;
/** @type {__VLS_StyleScopedClasses['nav-tab']} */ ;
/** @type {__VLS_StyleScopedClasses['nav-tab']} */ ;
/** @type {__VLS_StyleScopedClasses['list-controls']} */ ;
/** @type {__VLS_StyleScopedClasses['search-input']} */ ;
/** @type {__VLS_StyleScopedClasses['employee-cards']} */ ;
/** @type {__VLS_StyleScopedClasses['employee-card']} */ ;
/** @type {__VLS_StyleScopedClasses['employee-avatar']} */ ;
/** @type {__VLS_StyleScopedClasses['employee-details']} */ ;
/** @type {__VLS_StyleScopedClasses['employee-name']} */ ;
/** @type {__VLS_StyleScopedClasses['employee-position']} */ ;
/** @type {__VLS_StyleScopedClasses['employee-email']} */ ;
/** @type {__VLS_StyleScopedClasses['employee-status']} */ ;
/** @type {__VLS_StyleScopedClasses['employee-branch']} */ ;
/** @type {__VLS_StyleScopedClasses['employee-hire-date']} */ ;
/** @type {__VLS_StyleScopedClasses['employee-actions']} */ ;
/** @type {__VLS_StyleScopedClasses['no-results']} */ ;
/** @type {__VLS_StyleScopedClasses['modal-overlay']} */ ;
/** @type {__VLS_StyleScopedClasses['modal-content']} */ ;
/** @type {__VLS_StyleScopedClasses['modal-header']} */ ;
/** @type {__VLS_StyleScopedClasses['invalid-input']} */ ;
/** @type {__VLS_StyleScopedClasses['error-text']} */ ;
/** @type {__VLS_StyleScopedClasses['modal-actions']} */ ;
/** @type {__VLS_StyleScopedClasses['cancel-button']} */ ;
/** @type {__VLS_StyleScopedClasses['confirm-button']} */ ;
var __VLS_dollars;
let __VLS_self;
//# sourceMappingURL=EmployeeList.vue.js.map