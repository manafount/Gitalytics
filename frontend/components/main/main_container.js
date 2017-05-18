import { connect } from 'react-redux';
import { fetchUser } from '../../actions/github_actions'
import Main from './main';

const mapStateToProps = (state) => {
  let user = state.user;

  return { user };
};

const mapDispatchToProps = dispatch => ({
  fetchUser: (user) => dispatch(fetchUser(user))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Main);
