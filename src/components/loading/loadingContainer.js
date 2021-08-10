import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionsHandler from '../../actions/dashboard/dashboardActionHandler';
import Loading from './loading';

const mapStateToProps = state => ({
  summaryTotals: state.DashboardReducer.summaryTotals,

});

const mapDispatchToProps = dispatch => ({
  dashboardActionHandler: bindActionCreators(actionsHandler, dispatch),
});

const LoadingContatiner = connect(mapStateToProps, mapDispatchToProps)(Loading);
export default LoadingContatiner;
