import * as APIUtil from '../util/github_api_util'

export const RECEIVE_USER = "RECEIVE_USER";
export const RECEIVE_REPOS = "RECEIVE_REPOS";
export const RECEIVE_COMMITS = "RECEIVE_COMMITS";

export const receiveUser = user => ({
  type: RECEIVE_USER,
  user
})

export const fetchUser = user => dispatch => (
  APIUtil.fetchUser(user)
    .then(_user => dispatch(receiveUser(_user)))
);
