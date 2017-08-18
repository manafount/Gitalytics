import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

import StatBuilder from './github/statbuilder';

if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish('users', function usersPublication() {
    return Users.find({
      $or: [
        { private: { $ne: true } },
        { owner: this.userId },
      ],
    });
  });
}

Meteor.methods({
  'users.insert'(text) {
    check(text, String);
 
    if (! Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }
 
    Users.insert({
      text,
      createdAt: new Date(),
      owner: Meteor.userId(),
      username: Meteor.user().username,
    });
  },
  'users.remove'(userId) {
    check(userId, String);
 
    Users.remove(userId);
  },
  'users.search'(text) {
    check(text, String);
    

  }
});
 
export const Users = new Mongo.Collection('users');