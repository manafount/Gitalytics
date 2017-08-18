import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'react-meteor-data';

import { Users } from '../api/users.js';

 
class App extends Component {
  constructor(props) {
    super(props);
  }

  handleSubmit(event) {
    event.preventDefault();
 
    // Find the text field via the React ref
    const text = ReactDOM.findDOMNode(this.refs.textInput).value.trim();
 
    Meteor.call('users.search', text);
 
    // Clear form
    ReactDOM.findDOMNode(this.refs.textInput).value = '';
  }
 
  render() {
    return (
      <div className="container">
        <header>
          <h1>Gitalytics</h1>
        </header>
        <div className="search-container">
          <form className="user-search" onSubmit={this.handleSubmit.bind(this)} >
            <input
              type="text"
              ref="textInput"
              placeholder="Search GitHub users..."
            />
          </form>
          <div>
            Popular Searches:
            <ul>
              <li>Name 1</li>
              <li>Name 2</li>
              <li>Name 3</li>
              <li>Name 4</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default createContainer(() => {
  Meteor.subscribe('users');
  return {
    users: Users.find({}, { sort: { createdAt: -1 } }).fetch(),
  };
}, App);