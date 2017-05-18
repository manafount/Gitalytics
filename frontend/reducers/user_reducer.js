import { RECEIVE_USER } from '../actions/github_actions';

const oldState = {
  username: "",
  avatar_url: ""
};

const UserReducer = (state = oldState, action) => {
  Object.freeze(state);
  let newState = Object.assign({}, state);

  switch(action.type){
    case RECEIVE_USER:
      newState['username'] = action.user.login;
      newState['avatar_url'] = action.user.avatar_url;
      return newState;
    default:
      return state;
  }

}

export default UserReducer;
