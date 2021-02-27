import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Analytics from '../../components/analytics/analytics';
import * as actionsHandler from '../../actions/analytics/analyticsActionHandler';

const mapStateToProps = state => ({
    
});

const mapDispatchToProps = dispatch => ({ 
    analyticsActionHandler : bindActionCreators(actionsHandler, dispatch)
});

const AnalyticsContatiner = connect(mapStateToProps, mapDispatchToProps)(Analytics);
export default AnalyticsContatiner;
