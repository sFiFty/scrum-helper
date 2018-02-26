import locationHelperBuilder from 'redux-auth-wrapper/history4/locationHelper'
import {connectedRouterRedirect} from 'redux-auth-wrapper'
import SMLoader from 'Components/SMLoader'

const locationHelper = locationHelperBuilder({})

export const UserIsNotAuthenticated = connectedRouterRedirect({
  wrapperDisplayName: 'UserIsNotAuthenticated',
  AuthenticatingComponent: SMLoader,
  allowRedirectBack: false,
  redirectPath: (state, ownProps) =>
    locationHelper.getRedirectQueryParam(ownProps) || '/',
  authenticatingSelector: ({ firebase: { auth, isInitializing } }) =>
    !auth.isLoaded || isInitializing === true,
  authenticatedSelector: ({ firebase: { auth } }) =>
    auth.isLoaded && auth.isEmpty,
  redirectAction: newLoc => (dispatch) => {
    browserHistory.replace(newLoc); // or routerActions.replace
    dispatch({ type: 'UNAUTHED_REDIRECT' });
  },
});