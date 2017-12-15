import React from 'react'
import Navigation from './Navigation'
import firebase from '../../firebase/db'
import './logo.scss'

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
            <header className="text-center">
                <img 
                    className="logo" 
                    src={this.state.logoUrl} 
                    title="My Helper"
                    alt="My Helper"/>
                <Navigation />
            </header>
        )
    }
}