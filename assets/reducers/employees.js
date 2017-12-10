import { actions } from '../actions'

export default (state = { employees: {} }, action) => {
    switch (action.type) {
        case actions.EMPLOYEES_LOADED:
            if (!action.employees || Object.keys(action.employees).length === 0) {
                return state
            }
            return {
                employees: Object.assign(state.employees, action.employees)
            }
        case actions.EMPLOYEE_ADDED:
            return {
                employees: Object.assign(state.employees, action.employee)
            }
        default:
            return state
    }
    
}