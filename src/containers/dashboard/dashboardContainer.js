import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Dashboard from '../../components/dashboard/dashboard';
import * as actionsHandler from '../../actions/dashboard/dashboardActionHandler';

const mapStateToProps = state => ({
    
});

const mapDispatchToProps = dispatch => ({ 
    dashboardActionHandler : bindActionCreators(actionsHandler, dispatch)
});

const DashboardContatiner = connect(mapStateToProps, mapDispatchToProps)(Dashboard);
export default DashboardContatiner;
