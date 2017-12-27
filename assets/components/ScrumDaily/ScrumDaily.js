import React from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import { Link } from 'react-router-dom'
import './ceremony.scss'
import Paper from 'material-ui/Paper'

const button = {
    width: 400,
    height: 60
}

export default class ScrumDaily extends React.Component {
    render() {
        return (
            <Paper zDepth={2} className="start-scrum w-100 text-center  ">
                <RaisedButton labelStyle={{ fontSize: '18px'}} style={button} primary label="Start scrum ceremony" containerElement={<Link to="/daily/intro" />}/> 
            </Paper>
        )
    }
}