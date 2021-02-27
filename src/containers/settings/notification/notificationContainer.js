import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Notification from '../../../components/settings/notification/notification';
import * as actionsHandler from '../../../actions/settings/notification/notificationActionHandler';

const mapStateToProps = state => ({
    
});

const mapDispatchToProps = dispatch => ({ 
    notificationActionHandler : bindActionCreators(actionsHandler, dispatch)
});

const NotificationContatiner = connect(mapStateToProps, mapDispatchToProps)(Notification);
export default NotificationContatiner;
