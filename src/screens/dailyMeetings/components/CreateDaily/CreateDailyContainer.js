import { connect } from 'react-redux';
import { compose } from 'redux';
import { firebaseConnect } from 'react-redux-firebase';
import createPageHoc from 'Containers/createPageHoc.jsx';
import CreateDaily from './CreateDaily.jsx';


export default compose(
  firebaseConnect((props, state) => [
    {
      path: 'teams',
      queryParams: ['orderByChild=owner', `equalTo=${state.getState().firebase.auth.uid}`],
      storeAs: 'myTeams',
    },
  ]),
  connect(state => ({
    teams: state.firebase.data.myTeams,
    owner: state.firebase.auth.uid,
  })),
)(createPageHoc(CreateDaily));
