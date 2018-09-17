import { connect } from 'react-redux';
import { compose } from 'redux';
import { firebaseConnect } from 'react-redux-firebase';
import AddTeam from './AddTeam.jsx';

export default compose(
  firebaseConnect((props, state) => [
    {
      path: 'trello/integrations',
      queryParams: ['orderByChild=owner', `equalTo=${state.getState().firebase.auth.uid}`],
      storeAs: 'trelloCredentials',
    },
  ]),
  connect(state => ({
    trelloCredentials: state.firebase.data.trelloCredentials,
    profile: state.firebase.profile,
    owner: state.firebase.auth.uid,
  })),
)(AddTeam);
