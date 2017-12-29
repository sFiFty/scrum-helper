import React from 'react'
import ReactDOM from 'react-dom'
import AddEmployeeContainer from '../containers/AddEmployeeContainer'
import ScrumDaily from './ScrumDaily/ScrumDaily'
import DailyIntroContainer from '../containers/DailyIntroContainer'
import DailyShufflingContainer from '../containers/DailyShufflingContainer'
import Finishing from '../components/ScrumDaily/Finishing'
import Header from '../components/Header/Header'
import UserProfileContainer from '../containers/UserProfileContainer'
import EmployeeListContainer from '../containers/EmployeeListContainer'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { Route } from 'react-router-dom'
import {NotificationContainer} from 'react-notifications'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import {grey900} from 'material-ui/styles/colors'
import { isLoaded } from 'react-redux-firebase'
import SMLoader from '../components/SMLoader/SMLoader'

const muiTheme = getMuiTheme({
    palette: {
        primary1Color: grey900
    }
})

export default class App extends React.Component {
    render() {
        const { profile } = this.props
        return (
            !isLoaded(profile) 
            ? <SMLoader />
            : 
            <MuiThemeProvider muiTheme={muiTheme}>
                <div className="layout-container row">
                    <Header  />
                    <Route exact path="/" component={EmployeeListContainer} />
                    <Route exact path="/add" component={AddEmployeeContainer} />
                    <Route exact path="/daily" component={ScrumDaily} />
                    <Route exact path="/daily/intro" component={DailyIntroContainer} />
                    <Route exact path="/daily/shuffling" component={DailyShufflingContainer} />
                    <Route exact path="/daily/finishing" component={Finishing} />
                    <Route exact path="/user/:uid" component={UserProfileContainer} />
                    <NotificationContainer/>
                </div>
            </MuiThemeProvider>
        )
    }
}

