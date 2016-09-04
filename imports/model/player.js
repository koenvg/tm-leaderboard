import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check, Match} from 'meteor/check';

export const Players = new Mongo.Collection('players');


if (Meteor.isServer) {
    // This code only runs on the server
    Meteor.publish('players', function tasksPublication() {
        return Players.find({}, {
            sort: {time:1},
            limit: 10
        });
    });
}

validEmail = Match.Where(function (email) {
    check(email, String);
    let emailValidationRegex = /(^[\w-]+(\.[\w-]+)*@([\w-]+(\.[\w-]+)*?\.[a-zA-Z]{2,}|(\d{1,3}\.){3}\d{1,3})(:\d{4})?$)/g;
    return emailValidationRegex.test(email);
});
validTimeStamp = Match.Where(function (timeStamp) {
    check(timeStamp, String);
    let regexp = /([0-9]{2}:[0-9]{2})/g;
    return regexp.test(timeStamp);
});

Meteor.methods({
    'players.insert'(name, email, time) {
        check(name, String);
        //TODO: Better checking on email and time mm:ss.
        check(email, validEmail);
        check(time, validTimeStamp);

        Players.insert({
            name: name,
            email: email,
            time: time,
            createdAt: new Date(),
        });
    },
});