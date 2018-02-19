import React from 'react'
import ReactDOM from 'react-dom'
import AddMember from 'Apps/teams/AddMember'
import Header from 'Components/Header'
import UserProfile from 'Components/UserProfile'
import DailyList from 'Apps/dailyMeetings/DailyList'
import CreateDaily from 'Apps/dailyMeetings/CreateDaily'
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
          <Route exact path="/" component={TeamList} />
          <Route exact path="/email-confirmation" component={EmailConfirmation} />
          <Route exact path="/user/:uid" component={UserProfile} />
          <Route exact path="/teams" component={TeamList} />
          <Route exact path="/teams/add" component={AddTeam} />
          <Route exact path="/teams/:teamid/addMember" component={AddMember} />
          <Route exact path="/daily/" component={DailyList} />
          <Route exact path="/daily/create" component={CreateDaily} />
          <NotificationContainer/>
        </div>
      </MuiThemeProvider>
    )
  }
}

