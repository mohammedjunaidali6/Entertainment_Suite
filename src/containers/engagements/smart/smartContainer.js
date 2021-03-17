import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import EngagementsSmart from '../../../components/engagements/smart/smart';
import * as actionsHandler from '../../../actions/engagements/smart/smartActionHandler';

const mapStateToProps = state => ({
    setGoals: state.EngagementsSmartReducer.setGoals,
    targetAudience: state.EngagementsSmartReducer.targetAudience,
    defineJourney: state.EngagementsSmartReducer.defineJourney,
    rewardsAndBudget: state.EngagementsSmartReducer.rewardsAndBudget,
    review: state.EngagementsSmartReducer.review,
});

const mapDispatchToProps = dispatch => ({ 
    engagementsSmartActionHandler : bindActionCreators(actionsHandler, dispatch)
});

const EngagementsSmartContatiner = connect(mapStateToProps, mapDispatchToProps)(EngagementsSmart);
export default EngagementsSmartContatiner;