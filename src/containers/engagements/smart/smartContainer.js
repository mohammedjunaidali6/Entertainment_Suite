import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import EngagementsSmart from '../../../components/engagements/smart/smart';
import * as actionsHandler from '../../../actions/engagements/smart/smartActionHandler';

const mapStateToProps = state => ({
    campaignsData: state.EngagementsSmartReducer.campaignsData,
    setGoals: state.EngagementsSmartReducer.setGoals,
    targetAudience: state.EngagementsSmartReducer.targetAudience,
    defineJourney: state.EngagementsSmartReducer.defineJourney,
    journeyBox: state.EngagementsSmartReducer.journeyBox,
    rewardsAndBudget: state.EngagementsSmartReducer.rewardsAndBudget,
    rewardsData: state.EngagementsSmartReducer.rewardsData,
    budget: state.EngagementsSmartReducer.budget,
    budgetDuration: state.EngagementsSmartReducer.budgetDuration,
    review: state.EngagementsSmartReducer.review,
});

const mapDispatchToProps = dispatch => ({
    engagementsSmartActionHandler: bindActionCreators(actionsHandler, dispatch)
});

const EngagementsSmartContatiner = connect(mapStateToProps, mapDispatchToProps)(EngagementsSmart);
export default EngagementsSmartContatiner;
