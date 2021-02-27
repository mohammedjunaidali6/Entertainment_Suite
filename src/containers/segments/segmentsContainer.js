import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Segments from '../../components/segments/segments';
import * as actionsHandler from '../../actions/segments/segmentsActionHandler';

const mapStateToProps = state => ({
    
});

const mapDispatchToProps = dispatch => ({ 
    segmentsActionHandler : bindActionCreators(actionsHandler, dispatch)
});

const SegmentsContatiner = connect(mapStateToProps, mapDispatchToProps)(Segments);
export default SegmentsContatiner;
