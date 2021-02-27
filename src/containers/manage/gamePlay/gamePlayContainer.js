import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ManageGamePlay from '../../../components/manage/gamePlay/gamePlay';
import * as actionsHandler from '../../../actions/manage/gamePlay/gamePlayActionHandler';

const mapStateToProps = state => ({
    
});

const mapDispatchToProps = dispatch => ({ 
    manageGamePlayActionHandler : bindActionCreators(actionsHandler, dispatch)
});

const ManageGamePlayContatiner = connect(mapStateToProps, mapDispatchToProps)(ManageGamePlay);
export default ManageGamePlayContatiner;
