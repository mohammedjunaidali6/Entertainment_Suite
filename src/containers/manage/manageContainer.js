import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Manage from '../../components/manage/manage';
import * as actionsHandler from '../../actions/manage/manageActionHandler';

const mapStateToProps = state => ({
    
});

const mapDispatchToProps = dispatch => ({ 
    manageActionHandler : bindActionCreators(actionsHandler, dispatch)
});

const ManageContatiner = connect(mapStateToProps, mapDispatchToProps)(Manage);
export default ManageContatiner;
