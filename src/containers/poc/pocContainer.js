import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import POC from '../../components/poc/poc';
import * as actionsHandler from '../../actions/poc/pocActionHandler';

const mapStateToProps = state => ({
    
});

const mapDispatchToProps = dispatch => ({ 
    pocActionHandler : bindActionCreators(actionsHandler, dispatch)
});

const POCContatiner = connect(mapStateToProps, mapDispatchToProps)(POC);
export default POCContatiner;
