import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { firebaseConnect} from 'react-redux-firebase'
import UserProfile from '../components/UserProfile/UserProfile'

export default compose(
    firebaseConnect((props) => {
        return [
            {
              path: `users/${props.match.params.uid}`,
              storeAs: 'myUser'
            },
            {
              path: 'users',
            }
        ]
    }),
    connect(
        (state) => ({
            myUser: state.firebase.data.myUser,
            users: state.firebase.data.users,
        })
    )
)(UserProfile)