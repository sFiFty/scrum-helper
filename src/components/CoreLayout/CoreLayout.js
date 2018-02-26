import React from 'react'
import ReactDOM from 'react-dom'
import AddMember from 'Apps/teams/AddMember'
import Header from 'Components/Header'
import UserProfile from 'Components/UserProfile'
import DailyList from 'Apps/dailyMeetings/DailyList'
import CreateDaily from 'Apps/dailyMeetings/CreateDaily'
import Daily from 'Apps/dailyMeetings/Daily'
import EmailConfirmation from 'Components/EmailConfirmation'
import TeamList from 'Apps/teams/TeamList'
import AddTeam from 'Apps/teams/AddTeam'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import {Route} from 'react-router-dom'
import {NotificationContainer} from 'react-notifications'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import {grey900} from 'material-ui/styles/colors'
import {isLoaded} from 'react-redux-firebase'
import SMLoader from 'Components/SMLoader'
import LoadingScreen from 'Components/LoadingScreen'
import UserIsAuthenticated from 'Helpers/UserIsAuthenticated'

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: grey900
  }
})

export default class App extends React.Component {
  render() {
    const {profile} = this.props
    return (
      !isLoaded(profile) 
      ? <SMLoader />
      : 
      <MuiThemeProvider muiTheme={muiTheme}>
        <div className="layout-container row">
          <Header  />
          <Route exact path="/" component={UserIsAuthenticated(TeamList)} />
          <Route exact path="/email-confirmation" component={UserIsAuthenticated(EmailConfirmation)} />
          <Route exact path="/user/:uid" component={UserIsAuthenticated(UserProfile)} />
          <Route exact path="/teams" component={UserIsAuthenticated(TeamList)} />
          <Route exact path="/teams/add" component={UserIsAuthenticated(AddTeam)} />
          <Route exact path="/teams/:teamid/addMember" component={UserIsAuthenticated(AddMember)} />
          <Route exact path="/daily/" component={UserIsAuthenticated(DailyList)} />
          <Route exact path="/daily/create" component={UserIsAuthenticated(CreateDaily)} />
          <Route exact path="/daily/ongoing/:dailyid" component={UserIsAuthenticated(Daily)} />
          <Route exact path="/login" component={LoadingScreen} />
          <NotificationContainer/>
        </div>
      </MuiThemeProvider>
    )
  }
}

