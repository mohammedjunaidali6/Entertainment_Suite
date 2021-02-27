import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropertySettings from '../../../components/settings/propertySettings/propertySettings';
import * as actionsHandler from '../../../actions/settings/propertySettings/propertySettingsActionHandler';

const mapStateToProps = state => ({
    
});

const mapDispatchToProps = dispatch => ({ 
    propertySettingsActionHandler : bindActionCreators(actionsHandler, dispatch)
});

const PropertSettingsContatiner = connect(mapStateToProps, mapDispatchToProps)(PropertySettings);
export default PropertSettingsContatiner;
