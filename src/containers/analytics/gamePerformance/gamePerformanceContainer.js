import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import AnalyticsGamePerformance from '../../../components/analytics/gamePerformance/gamePerformance';
import * as actionsHandler from '../../../actions/analytics/gamePerformance/gamePerformanceHandler';

const mapStateToProps = state => ({
    
});

const mapDispatchToProps = dispatch => ({ 
    analyticsGamePerformanceActionHandler : bindActionCreators(actionsHandler, dispatch)
});

const AnalyticsGamePerformanceContatiner = connect(mapStateToProps, mapDispatchToProps)(AnalyticsGamePerformance);
export default AnalyticsGamePerformanceContatiner;
