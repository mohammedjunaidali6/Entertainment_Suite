import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Admin from '../../components/admin/admin';
import * as actionsHandler from '../../actions/admin/adminActionHandler';

const mapStateToProps = state => ({
    
});

const mapDispatchToProps = dispatch => ({ 
    adminActionHandler : bindActionCreators(actionsHandler, dispatch)
});

const AdminContatiner = connect(mapStateToProps, mapDispatchToProps)(Admin);
export default AdminContatiner;
