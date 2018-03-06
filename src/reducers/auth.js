import {actions} from '../actions'

export default (state = {user:{}}, action) => {
  switch (action.type) {
    case actions.AUTH_USER:
      if (!action.user) {
        return state
      }
      return {
        user: action.user
      }
    case actions.SIGN_OUT_USER:
      return {
        user: null
      }
    default:
      return state
  }
}