import rootReducer from '../reducers/index';
import { connect } from 'react-redux';
import CompanyKeyContainer from '../components/CompanyKeyContainer';

const mapStateToProps = (state, ownProps) => {
  return {
    setError: ownProps.setError,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setIsLoggedIn: (isLoggedIn) => {
      dispatch({ type: 'LOGIN', isLoggedIn: isLoggedIn });
    },

    setUser: (user) => {
      dispatch({ type: 'SET_USER', user });
    }
  }
}

const LoginContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(CompanyKeyContainer)

export default LoginContainer;