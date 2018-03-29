import React, {Component} from 'react'
import AuthModal from 'Components/AuthModal'
import './styles.scss'
const queryString = require('query-string')
import PropTypes from 'prop-types'

export default class LoadingScreen extends Component {
  state = {
    isDialogOpened: true,
  }

  redirectTo = destination => {
		const {history} = this.props
		let url = queryString.parse(destination) && queryString.parse(destination).redirect
    if (url) history.push(url)
  }
	render() {
    const {firebase, history} = this.props
    const {isDialogOpened} = this.state
		return (
      <div className="loading-screen-container">
        <AuthModal
          className="dialog"
          firebase={firebase} 
          history={history}
          dialogClose={this.dialogClose}
          isDialogOpened={isDialogOpened} 
          redirectTo={this.redirectTo}
        />
        <div className="overlay">
        </div>
      </div>
		)
  }
  
	static propTypes = {
		firebase: PropTypes.object.isRequired
	}
}