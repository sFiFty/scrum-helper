import React from 'react'
import Navigation from '../Navigation/Navigation'
import firebase from '../../firebase/db'
import './header.scss'

export default class Header extends React.Component {
    state = {
        logoUrl: null
    }
    componentWillMount() {
        firebase.storage().ref().child('logo.png').getDownloadURL().then(url => {
            this.setState({logoUrl: url})
        })
    }
    render() {
        return (
            <header className="row">
                <div className="col-3">
                    <img 
                        className="logo" 
                        src={this.state.logoUrl} 
                        title="Scrum Helper"
                        alt="Scrum Helper"/>
                </div>
                <Navigation />
            </header>
        )
    }
}