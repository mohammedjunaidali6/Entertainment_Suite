import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Accessibility from '../../../components/settings/accessibility/accessibility';
import * as actionsHandler from '../../../actions/settings/accessibility/accessibilityActionHandler';

const mapStateToProps = state => ({
    
});

const mapDispatchToProps = dispatch => ({ 
    accessibilityActionHandler : bindActionCreators(actionsHandler, dispatch)
});

const AccessibilityContatiner = connect(mapStateToProps, mapDispatchToProps)(Accessibility);
export default AccessibilityContatiner;
