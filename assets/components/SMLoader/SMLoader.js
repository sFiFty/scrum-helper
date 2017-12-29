import React from 'react'
import Loader from 'react-loaders'
export default class SMLoader extends React.Component {
    render() {

        const style = {transform: null}
        style.transform = this.props.size === 'xs' ? 'scale(0.25)' : 'scale(1)'
         
        return (
            <div className="loader-wrapper">
                <div className="overlay"></div>
                <Loader style={style} active type="ball-clip-rotate-multiple" />
            </div>
        )
    }
}