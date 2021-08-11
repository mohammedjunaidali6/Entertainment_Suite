import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Dashboard from '../../components/dashboard/dashboard';
import * as actionsHandler from '../../actions/dashboard/dashboardActionHandler';
import * as routeActionHandler from '../../actions/route/routeActionHandler';

const mapStateToProps = state => ({
    summaryTotals: state.DashboardReducer.summaryTotals,
    customerOverviewTotals: state.DashboardReducer.customerOverviewTotals,
    lineCanvasSalesData: state.DashboardReducer.lineCanvasSalesData,
    lineCanvasDayWiseActiveAndEngagedCustomers: state.DashboardReducer.lineCanvasDayWiseActiveAndEngagedCustomers,
    lineCanvasMonthWiseActiveAndEngagedCustomers: state.DashboardReducer.lineCanvasMonthWiseActiveAndEngagedCustomers,
});

const mapDispatchToProps = dispatch => ({
    dashboardActionHandler: bindActionCreators(actionsHandler, dispatch),
    routeActionHandler: bindActionCreators(routeActionHandler, dispatch)
});

const DashboardContatiner = connect(mapStateToProps, mapDispatchToProps)(Dashboard);
export default DashboardContatiner;
