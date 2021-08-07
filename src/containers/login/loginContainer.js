import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Login from '../../components/login/login';
import * as actionsHandler from '../../actions/login/loginActionHandler';

const mapStateToProps = state => ({
    userData: state.LoginReducer.userData,
    jwtToken: state.LoginReducer.jwtToken,
});

const mapDispatchToProps = dispatch => ({
    loginActionHandler: bindActionCreators(actionsHandler, dispatch),
});

const LoginContatiner = connect(mapStateToProps, mapDispatchToProps)(Login);
export default LoginContatiner;
