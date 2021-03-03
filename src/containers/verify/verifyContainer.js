import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Verify from '../../components/verify/verify';
import * as actionsHandler from '../../actions/verify/verifyActionHandler';

const mapStateToProps = state => ({
    
});

const mapDispatchToProps = dispatch => ({ 
    verifyActionHandler : bindActionCreators(actionsHandler, dispatch)
});

const VerifyContatiner = connect(mapStateToProps, mapDispatchToProps)(Verify);
export default VerifyContatiner;
