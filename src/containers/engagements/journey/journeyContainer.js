import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import EngagementsJourney from '../../../components/engagements/journey/journey';
import * as actionsHandler from '../../../actions/engagements/journey/journeyActionHandler';

const mapStateToProps = state => ({
    
});

const mapDispatchToProps = dispatch => ({ 
    engagementsJourneyActionHandler : bindActionCreators(actionsHandler, dispatch)
});

const EngagementsJourneyContatiner = connect(mapStateToProps, mapDispatchToProps)(EngagementsJourney);
export default EngagementsJourneyContatiner;
