import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import AnalyticsTrends from '../../../components/analytics/trends/trends';
import * as actionsHandler from '../../../actions/analytics/trends/trendsActionhandler';

const mapStateToProps = state => ({
    
});

const mapDispatchToProps = dispatch => ({ 
    analyticsTrendsActionHandler : bindActionCreators(actionsHandler, dispatch)
});

const AnalyticsTrendsContatiner = connect(mapStateToProps, mapDispatchToProps)(AnalyticsTrends);
export default AnalyticsTrendsContatiner;
