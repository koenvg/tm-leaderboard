import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Players = new Mongo.Collection('players');


if (Meteor.isServer) {
    // This code only runs on the server
    Meteor.publish('tasks', function tasksPublication() {
        return Players.find();
    });
}

Meteor.methods({
    'players.insert'(name, email, time) {
        check(name, String);
        //TODO: Better checking on email and time mm:ss.
        check(email, String);
        check(time,String);

        Players.insert({
            name: name,
            email: email,
            time: time,
            createdAt: new Date(),
        });
    },
});