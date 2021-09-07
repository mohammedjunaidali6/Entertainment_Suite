import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Team from '../../../components/settings/team/team';
import * as actionsHandler from '../../../actions/settings/team/teamActionHandler';
import * as loginActionHandler from '../../../actions/login/loginActionHandler';
import * as routeAction from '../../../actions/route/routeActionHandler';

const mapStateToProps = state => ({
    users: state.TeamReducer.users,
    roles: state.TeamReducer.roles
});

const mapDispatchToProps = dispatch => ({
    teamActionHandler: bindActionCreators(actionsHandler, dispatch),
    loginActionHandler: bindActionCreators(loginActionHandler, dispatch),
    routeActionHandler: bindActionCreators(routeAction, dispatch),
});

const TeamContatiner = connect(mapStateToProps, mapDispatchToProps)(Team);
export default TeamContatiner;
