import { LOGIN, LOGOUT, SET_USER } from '../constants/actions'

const initialState = {
    isLoggedIn: false,
    user: null,
  }

export default function authentication(state = initialState, action) {
  switch (action.type) {
    case LOGIN:
      return Object.assign({}, state, { isLoggedIn: true });

    case LOGOUT:
      return Object.assign({}, state, { isLoggedIn: false });

    case SET_USER:
      if(action.user) return Object.assign({}, state, { user: action.user });
      return state;

    default:
      return state
  }
}
