import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import EngagementsSmart from '../../../components/engagements/smart/smart';
import * as actionsHandler from '../../../actions/engagements/smart/smartActionHandler';

const mapStateToProps = state => ({
    
});

const mapDispatchToProps = dispatch => ({ 
    engagementsSmartActionHandler : bindActionCreators(actionsHandler, dispatch)
});

const EngagementsSmartContatiner = connect(mapStateToProps, mapDispatchToProps)(EngagementsSmart);
export default EngagementsSmartContatiner;
