import React from 'react'
import ReactDOM from 'react-dom'
import AddMemberContainer from '../containers/AddMemberContainer'
import DailyIntroContainer from '../containers/DailyIntroContainer'
import ScrumDailyCreationContainer from '../containers/ScrumDailyCreationContainer'
import Finishing from '../components/ScrumDaily/Finishing'
import HeaderContainer from '../containers/HeaderContainer'
import UserProfileContainer from '../containers/UserProfileContainer'
import EmployeeListContainer from '../containers/EmployeeListContainer'
import EmailConfirmationContainer from '../containers/EmailConfirmationContainer'
import TeamListContainer from '../containers/TeamListContainer'
import AddTeamContainer from '../containers/AddTeamContainer'
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
                    <HeaderContainer  />
                    <Route exact path="/" component={EmployeeListContainer} />
                    <Route exact path="/email-confirmation" component={EmailConfirmationContainer} />
                    <Route exact path="/teams/:teamid/addMember" component={AddMemberContainer} />
                    <Route exact path="/daily/" component={ScrumDailyCreationContainer} />
                    <Route exact path="/daily/:teamId/intro" component={DailyIntroContainer} />
                    <Route exact path="/daily/:teamId/finishing" component={Finishing} />
                    <Route exact path="/user/:uid" component={UserProfileContainer} />
                    <Route exact path="/teams" component={TeamListContainer} />
                    <Route exact path="/teams/add" component={AddTeamContainer} />
                    
                    <NotificationContainer/>
                </div>
            </MuiThemeProvider>
        )
    }
}

