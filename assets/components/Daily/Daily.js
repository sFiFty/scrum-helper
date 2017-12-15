import React from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import { Link } from 'react-router-dom'
import './ceremony.scss'
import firebase from '../../firebase/db'


export default class Daily extends React.Component {
    render() {
        return (
            <div className="text-center"> 
                <RaisedButton primary label="Start scrum ceremony" containerElement={<Link to="/daily/intro" />}/> 
            </div>
        )
    }
}