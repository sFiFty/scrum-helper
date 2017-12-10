import { connect } from 'react-redux'
import actions from '../actions'
import Employees from '../components/Employees/Employees'
import EmployeesApi from '../services/EmployeesApi'
import store from '../store/index'

const mapStateToProps = state => state.employees

const mapDispatchToProps = dispatch => (
  {
      onAddEmployee: (firstName, lastName, location) => EmployeesApi.addEmployee(dispatch, firstName, lastName, location)
  }
)
const EmployeeContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Employees)

EmployeesApi.getEmployees(store.dispatch)

export default EmployeeContainer