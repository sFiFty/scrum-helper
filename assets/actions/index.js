export const actions = {
    'EMPLOYEES_LOADED': Symbol('EMPLOYEES_LOADED'),
    'EMPLOYEE_ADDED': Symbol('EMPLOYEE_ADDED')
};

export default {
    EMPLOYEES_LOADED: employees => ({
        type: actions.EMPLOYEES_LOADED,
        employees
    }),
    EMPLOYEE_ADDED: employee => ({
        type: actions.EMPLOYEE_ADDED,
        employee
    })
};