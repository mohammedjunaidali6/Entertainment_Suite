import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import EngagementsSmart from '../../../components/engagements/smart/smart';
import * as actionsHandler from '../../../actions/engagements/smart/smartActionHandler';
import * as routeActionHandler from '../../../actions/route/routeActionHandler';

const mapStateToProps = state => ({
    campaignsData: state.EngagementsSmartReducer.campaignsData,
    setGoals: state.EngagementsSmartReducer.setGoals,
    targetAudience: state.EngagementsSmartReducer.targetAudience,
    defineJourney: state.EngagementsSmartReducer.defineJourney,
    journeyBox: state.EngagementsSmartReducer.journeyBox,
    rewardsAndBudget: state.EngagementsSmartReducer.rewardsAndBudget,
    review: state.EngagementsSmartReducer.review,
});

const mapDispatchToProps = dispatch => ({
    engagementsSmartActionHandler: bindActionCreators(actionsHandler, dispatch),
    routeActionHandler: bindActionCreators(routeActionHandler, dispatch)
});

const EngagementsSmartContatiner = connect(mapStateToProps, mapDispatchToProps)(EngagementsSmart);
export default EngagementsSmartContatiner;
