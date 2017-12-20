import React from 'react'
import firebase from '../../firebase/db'
import RaisedButton from 'material-ui/RaisedButton'
import { Link } from 'react-router-dom'
import ReactDOM from 'react-dom'
import Loader from 'react-loaders'

export default class Intro extends React.Component {
    state = {
        loaded: false,
    }
    componentDidMount() {
        let image = ReactDOM.findDOMNode(this.refs.img)
        firebase.storage().ref().child('daily-intro.jpg').getDownloadURL().then(url => {
            image.src = url
            image.onload = () => this.setState({ loaded: true })
        })
    }    
    nextStep = () => {
        this.props.history.push('/daily/shuffling')
    }
    render() {
        const { loaded } = this.state
        return (
            <div className="text-center"> 
                    <div className="overlay"></div>
                    <Loader active={!loaded} type="ball-clip-rotate-multiple" />
                    <img 
                        onClick={this.nextStep}
                        ref="img"
                        className={loaded ? "image image-loaded fullpage-pic" : 'image'}
                        alt="Daily Intro"/>
            </div>
        )
    }
}