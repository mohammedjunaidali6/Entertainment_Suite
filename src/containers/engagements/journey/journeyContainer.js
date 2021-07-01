import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import EngagementsJourney from '../../../components/engagements/journey/journey';
import * as actionsHandler from '../../../actions/engagements/journey/journeyActionHandler';
import * as routeActionHandler from '../../../actions/route/routeActionHandler';

const mapStateToProps = state => ({
    allJourneysData: state.EngagementsJourneyReducer.allJourneysData,
    allJourneyTasks: state.EngagementsJourneyReducer.allJourneyTasks
});

const mapDispatchToProps = dispatch => ({
    engagementsJourneyActionHandler: bindActionCreators(actionsHandler, dispatch),
    routeActionHandler: bindActionCreators(routeActionHandler, dispatch)
});

const EngagementsJourneyContatiner = connect(mapStateToProps, mapDispatchToProps)(EngagementsJourney);
export default EngagementsJourneyContatiner;
