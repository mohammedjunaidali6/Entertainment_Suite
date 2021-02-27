import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ManageRewards from '../../../components/manage/rewards/rewards';
import * as actionsHandler from '../../../actions/manage/rewards/rewardsActionHandler';

const mapStateToProps = state => ({
    
});

const mapDispatchToProps = dispatch => ({ 
    manageRewardsActionHandler : bindActionCreators(actionsHandler, dispatch)
});

const ManageRewardsContatiner = connect(mapStateToProps, mapDispatchToProps)(ManageRewards);
export default ManageRewardsContatiner;
