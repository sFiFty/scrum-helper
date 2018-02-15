import React from 'react'
import ReactDOM from 'react-dom'
import AddMemberContainer from 'Containers/Teams/AddMemberContainer'
import HeaderContainer from 'Containers/HeaderContainer'
import UserProfileContainer from 'Containers/UserProfileContainer'
import DailyListContainer from 'Containers/DailyMeetings/DailyListContainer'
import EmailConfirmationContainer from 'Containers/EmailConfirmationContainer'
import TeamListContainer from 'Containers/Teams/TeamListContainer'
import AddTeamContainer from 'Containers/Teams/AddTeamContainer'
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
          <HeaderContainer  />
          <Route exact path="/" component={TeamListContainer} />
          <Route exact path="/email-confirmation" component={EmailConfirmationContainer} />
          <Route exact path="/teams/:teamid/addMember" component={AddMemberContainer} />
          <Route exact path="/daily/" component={DailyListContainer} />
          <Route exact path="/user/:uid" component={UserProfileContainer} />
          <Route exact path="/teams" component={TeamListContainer} />
          <Route exact path="/teams/add" component={AddTeamContainer} />
          <NotificationContainer/>
        </div>
      </MuiThemeProvider>
    )
  }
}

