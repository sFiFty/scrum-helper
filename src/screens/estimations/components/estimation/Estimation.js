import React, {Component} from 'react'
import {isLoaded, isEmpty} from 'react-redux-firebase'
import SMLoader from 'Components/SMLoader'
import {Container} from 'semantic-ui-react'
import PropTypes from 'prop-types'
import SelectUser from './SelectUser'
import './styles.scss'

const propTypes = {
  estimationId: PropTypes.string.isRequired,
  firebase: PropTypes.object.isRequired,
  estimation: PropTypes.object,
  auth: PropTypes.object
}
export default class Estimation extends Component {
  state = {
    userKey: null
  }

  componentDidMount() {
    const {auth, estimationId} = this.props
    const {userKey} = this.state
    if (userKey === null && estimationId) this.setUserKey(auth, estimationId)
  }

  setUserKey = (auth, estimationId) => {
    if (!isLoaded(auth)) return
    isEmpty(auth) ? this.setAnonymousKey(estimationId) : this.setState({userKey: auth.uid})
  }

  setAnonymousKey = meetingId => {
    if (localStorage.getItem(meetingId)) {
      this.setState({userKey: localStorage.getItem(meetingId)})
    } else {
      const key = this.generateHash()
      localStorage.setItem(meetingId, key)
      this.setState({userKey: key})
    }
  }

  generateHash = () => Math.random().toString(36).substring(7)

  render() {
    const {estimation, firebase, estimationId} = this.props
    console.log(estimation);
    const {userKey} = this.state
    return (
      <Container className="estimation-meeting-container text-center">
        {
          isLoaded(estimation) ? 
          <SelectUser 
            estimation={estimation} 
            userKey={userKey} 
            firebase={firebase} 
            estimationId={estimationId}/> :
          <SMLoader />
        }
      </Container>
    )
  }
}

Estimation.propTypes = propTypes