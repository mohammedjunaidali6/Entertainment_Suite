import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Register from '../../components/register/register';
import * as actionsHandler from '../../actions/register/registerActionHandler';

const mapStateToProps = state => ({
    
});

const mapDispatchToProps = dispatch => ({ 
    registerActionHandler : bindActionCreators(actionsHandler, dispatch)
});

const RegisterContatiner = connect(mapStateToProps, mapDispatchToProps)(Register);
export default RegisterContatiner;
