import React from 'react'
import Loader from 'react-loaders'

export default class SMLoader extends React.Component {
    render() {
        return (
            <div className="loader-wrapper">
                <div className="overlay"></div>
                <Loader active type="ball-clip-rotate-multiple" />
            </div>
        )
    }
}