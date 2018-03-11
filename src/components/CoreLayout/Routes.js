import React, {Component} from 'react'
import AddMember from 'Apps/teams/AddMember'
import Header from 'Components/Header'
import UserProfile from 'Components/UserProfile'
import DailyList from 'Apps/dailyMeetings/DailyList'
import CreateDaily from 'Apps/dailyMeetings/CreateDaily'
import Daily from 'Apps/dailyMeetings/Daily'
import EmailConfirmation from 'Components/EmailConfirmation'
import TeamList from 'Apps/teams/TeamList'
import AddTeam from 'Apps/teams/AddTeam'
import {Route} from 'react-router-dom'
import LoadingScreen from 'Components/LoadingScreen'
import UserIsAuthenticated from 'Helpers/UserIsAuthenticated'
import Home from 'Components/Home'

export default class Routes extends Component {
  render() {
    return (
      <div className="site-content">
        <Route exact path="/" component={Home} />
        <Route exact path="/email-confirmation" component={UserIsAuthenticated(EmailConfirmation)} />
        <Route exact path="/user/:uid" component={UserIsAuthenticated(UserProfile)} />
        <Route exact path="/teams" component={UserIsAuthenticated(TeamList)} />
        <Route exact path="/teams/add" component={UserIsAuthenticated(AddTeam)} />
        <Route exact path="/teams/:teamid/addMember" component={UserIsAuthenticated(AddMember)} />
        <Route exact path="/daily/" component={UserIsAuthenticated(DailyList)} />
        <Route exact path="/daily/create" component={UserIsAuthenticated(CreateDaily)} />
        <Route exact path="/daily/ongoing/:dailyid" component={UserIsAuthenticated(Daily)} />
        <Route exact path="/login" component={LoadingScreen} />
      </div>
    )
  }
}

