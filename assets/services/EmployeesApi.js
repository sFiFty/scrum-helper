import actions from '../actions'
import db from './db'

export default {
    getEmployees: dispatch => {
        let employees = db.ref('employees')
        employees.on('value', snapshot => {
            dispatch(actions.EMPLOYEES_LOADED(snapshot.val()))
        })
    },
    addEmployee: (dispatch, firstName = null, lastName = null, location = null) => {
        let employees = db.ref().child('employees')
        const primaryKey = new Date().getTime()
        employees.child(primaryKey).set({
            'firstName': firstName,
            'lastName': lastName,
            'location': location
        })
    }
};