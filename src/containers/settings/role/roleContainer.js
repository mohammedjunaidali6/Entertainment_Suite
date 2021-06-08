import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Role from '../../../components/settings/role/role';
import * as actionsHandler from '../../../actions/settings/role/roleActionHandler';

const mapStateToProps = state => ({
    roleData: state.RoleReducer.roleData,
    permissions: state.RoleReducer.permissions
});

const mapDispatchToProps = dispatch => ({
    notificationActionHandler: bindActionCreators(actionsHandler, dispatch)
});

const RoleContatiner = connect(mapStateToProps, mapDispatchToProps)(Role);
export default RoleContatiner;
