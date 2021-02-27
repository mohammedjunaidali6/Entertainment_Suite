import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Settings from '../../components/settings/settings';
import * as actionsHandler from '../../actions/settings/settingsActionHandler';

const mapStateToProps = state => ({
    
});

const mapDispatchToProps = dispatch => ({ 
    settingsActionHandler : bindActionCreators(actionsHandler, dispatch)
});

const SettingsContatiner = connect(mapStateToProps, mapDispatchToProps)(Settings);
export default SettingsContatiner;
