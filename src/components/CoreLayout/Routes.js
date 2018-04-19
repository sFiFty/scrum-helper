import React, {Component} from 'react'
import {Route} from 'react-router-dom'
import DailyList from 'Screens/dailyMeetings/components/DailyList'
import CreateDaily from 'Screens/dailyMeetings/components/CreateDaily'
import Daily from 'Screens/dailyMeetings/components/Daily'
import TeamList from 'Screens/teams/components/TeamList'
import AddTeam from 'Screens/teams/components/AddTeam'
import AddMember from 'Screens/teams/components/AddMember'
import EstimationList from 'Screens/estimations/components/EstimationList'
import CreateEstimation from 'Screens/estimations/components/CreateEstimation'
import Estimation from 'Screens/estimations/components/Estimation'
import EmailConfirmation from 'Screens/emailConfirmation'
import UserProfile from 'Screens/userProfile'
import LoadingScreen from 'Screens/loadingScreen'
import ContactUs from 'Screens/contactUs'
import Home from 'Screens/home'
import PrivacyPolicy from 'Screens/privacyPolicy'
import UserIsAuthenticated from 'Helpers/UserIsAuthenticated'


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
        <Route exact path="/daily" component={UserIsAuthenticated(DailyList)} />
        <Route exact path="/daily/create" component={UserIsAuthenticated(CreateDaily)} />
        <Route exact path="/daily/ongoing/:dailyid" component={UserIsAuthenticated(Daily)} />
        <Route exact path="/estimation" component={UserIsAuthenticated(EstimationList)} />
        <Route exact path="/estimation/create" component={UserIsAuthenticated(CreateEstimation)} />
        <Route exact path="/estimation/ongoing/:estimationid" component={UserIsAuthenticated(Estimation)} />
        <Route exact path="/login" component={LoadingScreen} />
        <Route exact path="/contacts" component={ContactUs} />
        <Route exact path="/privacy-policy" component={PrivacyPolicy} />
        
      </div>
    )
  }
}

