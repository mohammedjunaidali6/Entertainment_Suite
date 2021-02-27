import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Team from '../../../components/settings/team/team';
import * as actionsHandler from '../../../actions/settings/team/teamActionHandler';

const mapStateToProps = state => ({
    
});

const mapDispatchToProps = dispatch => ({ 
    teamActionHandler : bindActionCreators(actionsHandler, dispatch)
});

const TeamContatiner = connect(mapStateToProps, mapDispatchToProps)(Team);
export default TeamContatiner;
