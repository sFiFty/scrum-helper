import { createStore, combineReducers, compose } from 'redux';
import { reactReduxFirebase, firebaseReducer } from 'react-redux-firebase';
import firebase from '../firebase/db';
import auth from '../reducers/auth';

// react-redux-firebase config
const rrfConfig = {
  userProfile: 'users',
  // useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
};

// initialize firestore
// firebase.firestore() // <- needed if using firestore

// Add reduxReduxFirebase enhancer when making store creator
const createStoreWithFirebase = compose(
  reactReduxFirebase(firebase, rrfConfig),
  // reduxFirestore(firebase) // <- needed if using firestore
)(createStore);

// Add Firebase to reducers
const rootReducer = combineReducers({
  firebase: firebaseReducer,
  auth,
  // firestore: firestoreReducer // <- needed if using firestore
});

// Create store with reducers and initial state
const initialState = {};
export default createStoreWithFirebase(rootReducer, initialState);
