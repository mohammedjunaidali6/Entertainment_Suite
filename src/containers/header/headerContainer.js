import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Header from '../../components/header/header';
import * as actionsHandler from '../../actions/header/headerActionHandler';

const mapStateToProps = state => ({
    
});

const mapDispatchToProps = dispatch => ({ 
    headerActionHandler : bindActionCreators(actionsHandler, dispatch)
});

const HeaderContatiner = connect(mapStateToProps, mapDispatchToProps)(Header);
export default HeaderContatiner;
