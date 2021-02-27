import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Engagements from '../../components/engagements/engagements';
import * as actionsHandler from '../../actions/engagements/engagementsActionHandler';

const mapStateToProps = state => ({
    
});

const mapDispatchToProps = dispatch => ({ 
    engagementsActionHandler : bindActionCreators(actionsHandler, dispatch)
});

const ManageContatiner = connect(mapStateToProps, mapDispatchToProps)(Engagements);
export default ManageContatiner;
