import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import App from './App';
import AddEmployeeContainer from './containers/AddEmployeeContainer'
import ScrumDaily from './components/ScrumDaily/ScrumDaily'
import DailyIntroContainer from './containers/DailyIntroContainer'
import DailyShufflingContainer from './containers/DailyShufflingContainer'
import Finishing from './components/ScrumDaily/Finishing'
import Header from './components/Header/Header'
import UserProfileContainer from './containers/UserProfileContainer'
import registerServiceWorker from './registerServiceWorker'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
global.jQuery = require('jquery')
global.Tether = require('tether')
require('bootstrap')
import './sass/index.scss'
import 'react-notifications/lib/notifications.css'
import 'semantic-ui-css/semantic.min.css'
import {grey900} from 'material-ui/styles/colors';
import {NotificationContainer} from 'react-notifications'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import { Provider } from 'react-redux'
import store from './store'

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: grey900
  }
})
ReactDOM.render(

    <MuiThemeProvider muiTheme={muiTheme}>
      <Provider store={store}>
        <Router basename="/">
          <div>
            <div className="layout-container row">
                <Header  />
                <Route exact path="/" render={() => <App />} />
                <Route exact path="/add" component={AddEmployeeContainer} />
                <Route exact path="/daily" component={ScrumDaily} />
                <Route exact path="/daily/intro" component={DailyIntroContainer} />
                <Route exact path="/daily/shuffling" component={DailyShufflingContainer} />
                <Route exact path="/daily/finishing" component={Finishing} />
                <Route exact path="/user/:uid" component={UserProfileContainer} />
                <NotificationContainer/>
            </div>
            
          </div>
        </Router>
      </Provider>
    </MuiThemeProvider>,
    document.getElementById('root'))
  registerServiceWorker()