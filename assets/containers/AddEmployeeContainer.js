import React from 'react'
import { withFirebase } from 'react-redux-firebase'
import AddEmployee from '../components/AddEmployee/AddEmployee'

export default withFirebase(AddEmployee)