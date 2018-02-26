import React, {Component} from 'react'
import AuthModal from 'Components/AuthModal'
import './styles.scss'

export default class LoadingScreen extends Component {
  state = {
    isDialogOpened: true,
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
        />
        <div className="overlay">
        </div>
      </div>

		)
	}
}