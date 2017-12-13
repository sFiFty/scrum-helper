import React from 'react'
import Navigation from './Navigation'
import firebase from '../../firebase/db'
import './logo.scss'

export default class Match extends React.Component {
    state = {
        logoUrl: null
    }
    componentWillMount() {
        this.getLogo()
    }
    render() {
        return (
            <header>
                <img 
                    className="logo" 
                    src={this.state.logoUrl} 
                    title="My Helper"
                    alt="My Helper"/>
                <Navigation />
            </header>
        )
    }

    getLogo = () => {
        firebase.storage().ref().child('logo.png').getDownloadURL().then(url => {
            this.setState({logoUrl: url})
        })
    }
}