import rootReducer from '../reducers/index';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { LOGOUT, SET_USER } from '../constants/actions';
import LogoutButton from '../components/LogoutButton';

const mapStateToProps = (state, ownProps) => {
  return {
      text: ownProps.text,
      toggleSlideout: ownProps.toggleSlideout,
  }
}

const mapDispatchToProps = (dispatch) => {
    return {
        logoutHandler: () => {
            localStorage.removeItem('api_key');
            localStorage.removeItem('company');
            localStorage.removeItem('user');
            browserHistory.push('/login');
            dispatch({ type: SET_USER, user: null })
            dispatch({ type: LOGOUT });
        },
    }
}

const LogoutButtonContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(LogoutButton)

export default LogoutButtonContainer;