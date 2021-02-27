import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import AnalyticsReport from '../../../components/analytics/report/report';
import * as actionsHandler from '../../../actions/analytics/report/reportActionHandler';

const mapStateToProps = state => ({
    
});

const mapDispatchToProps = dispatch => ({ 
    analyticsReportActionHandler : bindActionCreators(actionsHandler, dispatch)
});

const AnalyticsReportContatiner = connect(mapStateToProps, mapDispatchToProps)(AnalyticsReport);
export default AnalyticsReportContatiner;
