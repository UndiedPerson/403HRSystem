import axios from 'axios';
export default (await import('vue')).defineComponent({
    props: {
        employee: {
            type: Object,
            default: null
        }
    },
    methods: {
        validateContactNumber() {
            // เอาเฉพาะตัวเลข
            let value = this.formData.contact_number.replace(/\D/g, '');
            // ถ้ายังไม่มีอะไรพิมพ์ → ไม่แจ้งเตือน
            if (value.length === 0) {
                this.contactNumberError = '';
                this.formData.contact_number = '';
                return;
            }
            // ถ้าตัวแรกไม่ใช่ 0 → ล้างออกทันที
            if (value[0] !== '0') {
                this.contactNumberError = 'เบอร์โทรต้องขึ้นต้นด้วยเลข 0';
                this.formData.contact_number = '';
                return;
            }
            // ตัดความยาวให้ไม่เกิน 10 ตัว
            if (value.length > 10) {
                value = value.slice(0, 10);
            }
            // ไม่มี error
            this.contactNumberError = '';
            this.formData.contact_number = value;
        }
    },
    data() {
        return {
            formData: {
                name: '',
                position: '',
                branch: '',
                hire_date: '',
                contact_number: '',
                email: ''
            },
            isDuplicate: false, // ใช้เพื่อเช็คว่าเกิดข้อมูลซ้ำหรือไม่
            contactNumberError: '' // ใช้เก็บข้อความแจ้งเตือน
        };
    },
    computed: {
        isEditMode() {
            return !!this.employee;
        }
    },
    watch: {
        employee(newVal) {
            if (newVal) {
                this.formData = { ...newVal };
            }
            else {
                this.resetForm();
            }
        }
    },
    methods: {
        async saveEmployee() {
            try {
                // ตรวจสอบข้อมูลก่อนที่จะบันทึก
                await this.checkDuplicates();
                if (this.isDuplicate) {
                    // ถ้ามีข้อมูลซ้ำ ไม่ทำการบันทึก
                    alert("มีข้อมูลซ้ำในระบบ!");
                    return;
                }
                let payload;
                if (this.employee) {
                    // Edit Mode: Merge old data with new non-empty values
                    payload = { ...this.employee };
                    for (const key in this.formData) {
                        if (this.formData[key] !== '') {
                            payload[key] = this.formData[key];
                        }
                    }
                    payload.id = this.employee.id;
                }
                else {
                    // Create Mode
                    payload = { ...this.formData };
                }
                const url = this.employee
                    ? 'http://127.0.0.1/HrSystem_project/Human-Resource-Management-System_System_Analysis_and_Design_Project/HR_System--/api/employees/update.php'
                    : 'http://127.0.0.1/HrSystem_project/Human-Resource-Management-System_System_Analysis_and_Design_Project/HR_System--/api/employees/create.php';
                await axios.post(url, payload);
                alert(this.employee ? 'Employee updated!' : 'Employee created!');
                this.$emit('employee-saved');
                this.closeForm();
            }
            catch (error) {
                console.error('Error saving employee:', error);
                alert('Error saving employee.');
            }
        },
        async checkDuplicates() {
            try {
                const { name, email, contact_number } = this.formData;
                const response = await axios.post('http://127.0.0.1/HrSystem_project/Human-Resource-Management-System_System_Analysis_and_Design_Project/HR_System--/api/employees/check_duplicates.php', {
                    name,
                    email,
                    contact_number
                });
                if (response.data.isDuplicate) {
                    this.isDuplicate = true;
                }
                else {
                    this.isDuplicate = false;
                }
            }
            catch (error) {
                console.error('Error checking duplicates:', error);
            }
        },
        closeForm() {
            this.$emit('close');
            this.resetForm();
        },
        resetForm() {
            this.formData = {
                name: '',
                position: '',
                branch: '',
                hire_date: '',
                contact_number: '',
                email: ''
            };
            this.isDuplicate = false; // reset duplicate state
        }
    },
});
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['form-header']} */ ;
/** @type {__VLS_StyleScopedClasses['form-group']} */ ;
/** @type {__VLS_StyleScopedClasses['form-group']} */ ;
/** @type {__VLS_StyleScopedClasses['form-group']} */ ;
/** @type {__VLS_StyleScopedClasses['save-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['cancel-btn']} */ ;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "form-overlay" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "employee-form" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "form-header" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.svg, __VLS_intrinsicElements.svg)({
    viewBox: "0 0 24 24",
    fill: "currentColor",
    ...{ class: "header-icon" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.path)({
    d: "M12 2a10 10 0 100 20 10 10 0 000-20zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z",
});
(__VLS_ctx.employee ? 'Edit Employee' : 'Add Employee');
__VLS_asFunctionalElement(__VLS_intrinsicElements.form, __VLS_intrinsicElements.form)({
    ...{ onSubmit: (__VLS_ctx.saveEmployee) },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "form-group" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
    for: "name",
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
    type: "text",
    id: "name",
    value: (__VLS_ctx.formData.name),
    readonly: (__VLS_ctx.isEditMode),
    required: true,
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "form-group" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
    for: "position",
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
    type: "text",
    id: "position",
    value: (__VLS_ctx.formData.position),
    required: true,
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "form-group" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
    for: "branch",
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
    type: "text",
    id: "branch",
    value: (__VLS_ctx.formData.branch),
    required: true,
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "form-group" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
    for: "hire_date",
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
    type: "date",
    id: "hire_date",
    required: true,
    readonly: (__VLS_ctx.isEditMode),
});
(__VLS_ctx.formData.hire_date);
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "form-group" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
    for: "contact_number",
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
    ...{ onInput: (__VLS_ctx.validateContactNumber) },
    type: "text",
    id: "contact_number",
    value: (__VLS_ctx.formData.contact_number),
    maxlength: "10",
    required: true,
    readonly: (__VLS_ctx.isEditMode),
});
if (__VLS_ctx.contactNumberError) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
        ...{ class: "input-error" },
    });
    (__VLS_ctx.contactNumberError);
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "form-group" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
    for: "email",
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
    type: "email",
    id: "email",
    readonly: (__VLS_ctx.isEditMode),
    required: true,
});
(__VLS_ctx.formData.email);
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "form-buttons" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
    ...{ onClick: (__VLS_ctx.saveEmployee) },
    type: "submit",
    ...{ class: "save-btn" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
    ...{ onClick: (__VLS_ctx.closeForm) },
    type: "button",
    ...{ class: "cancel-btn" },
});
if (__VLS_ctx.isDuplicate) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "error-message" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
}
/** @type {__VLS_StyleScopedClasses['form-overlay']} */ ;
/** @type {__VLS_StyleScopedClasses['employee-form']} */ ;
/** @type {__VLS_StyleScopedClasses['form-header']} */ ;
/** @type {__VLS_StyleScopedClasses['header-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['form-group']} */ ;
/** @type {__VLS_StyleScopedClasses['form-group']} */ ;
/** @type {__VLS_StyleScopedClasses['form-group']} */ ;
/** @type {__VLS_StyleScopedClasses['form-group']} */ ;
/** @type {__VLS_StyleScopedClasses['form-group']} */ ;
/** @type {__VLS_StyleScopedClasses['input-error']} */ ;
/** @type {__VLS_StyleScopedClasses['form-group']} */ ;
/** @type {__VLS_StyleScopedClasses['form-buttons']} */ ;
/** @type {__VLS_StyleScopedClasses['save-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['cancel-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['error-message']} */ ;
var __VLS_dollars;
let __VLS_self;
//# sourceMappingURL=EmployeeForm.vue.js.map