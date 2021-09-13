import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ManageRewards from '../../../components/manage/rewards/rewards';
import * as actionsHandler from '../../../actions/manage/rewards/rewardsActionHandler';
import * as routeActionHandler from '../../../actions/route/routeActionHandler';

const mapStateToProps = state => ({
    masterRewards:state.ManageRewardsReducer.masterRewards,
    
});

const mapDispatchToProps = dispatch => ({ 
    manageRewardsActionHandler : bindActionCreators(actionsHandler, dispatch),
    routeActionHandler : bindActionCreators(routeActionHandler, dispatch),
});

const ManageRewardsContatiner = connect(mapStateToProps, mapDispatchToProps)(ManageRewards);
export default ManageRewardsContatiner;
