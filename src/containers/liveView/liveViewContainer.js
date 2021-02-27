import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import LiveView from '../../components/liveView/liveView';
import * as actionsHandler from '../../actions/liveView/liveViewActionHandler';

const mapStateToProps = state => ({
    
});

const mapDispatchToProps = dispatch => ({ 
    liveViewActionHandler : bindActionCreators(actionsHandler, dispatch)
});

const LiveViewContatiner = connect(mapStateToProps, mapDispatchToProps)(LiveView);
export default LiveViewContatiner;
