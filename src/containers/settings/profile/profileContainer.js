import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Profile from '../../../components/settings/profile/profile';
import * as actionsHandler from '../../../actions/settings/profile/profileActionHandler';

const mapStateToProps = state => ({
    
});

const mapDispatchToProps = dispatch => ({ 
    profileActionHandler : bindActionCreators(actionsHandler, dispatch)
});

const ProfileContatiner = connect(mapStateToProps, mapDispatchToProps)(Profile);
export default ProfileContatiner;
