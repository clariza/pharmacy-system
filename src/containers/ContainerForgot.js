import { connect } from 'react-redux';
import { forgot } from '../actions/forgot';
import Forgot from './../components/forgot/forgot';

const mapStateToProps = state => {
  return {
    response: state.response,
    loading: state.loading
  }
};

const mapDispatchToProps = dispatch => {
  return {
    onForgot: (email) => {
      dispatch(forgot(email));
    }
  };
};

export default connect( mapStateToProps, mapDispatchToProps)(Forgot);
