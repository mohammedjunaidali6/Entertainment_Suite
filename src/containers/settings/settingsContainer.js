import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Settings from '../../components/settings/settings';
import * as actionsHandler from '../../actions/settings/settingsActionHandler';
import * as routeActionHandler from '../../actions/route/routeActionHandler';

const mapStateToProps = state => ({
    
});

const mapDispatchToProps = dispatch => ({ 
    settingsActionHandler : bindActionCreators(actionsHandler, dispatch),
    routeActionHandler:bindActionCreators(routeActionHandler,dispatch)
});

const SettingsContatiner = connect(mapStateToProps, mapDispatchToProps)(Settings);
export default SettingsContatiner;
