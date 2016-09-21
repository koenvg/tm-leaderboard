import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check, Match} from 'meteor/check';
import fs from 'fs';

export const Players = new Mongo.Collection('players');


if (Meteor.isServer) {
    // This code only runs on the server
    Meteor.publish('leaderboard', function tasksPublication() {
        return Players.find({}, {
            sort: {time:1},
            limit: 10
        });
    });
    Meteor.publish('latestEntries', function publication(size) {
        check(size, Number);
        return Players.find({}, {
            sort: {createdAt: -1},
            limit: size
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
    let regexp = /([0-9]{2}:[0-9]{2}\.[0-9]{3})/g;
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
    'player.update'(player){
        check(player.email, validEmail);
        check(player.time, validTimeStamp);
        Players.update(player._id,{
            $set: {
                    name: player.name,
                    email: player.email,
                    time: player.time
                }
            }
        );
    },
    'player.position'(time){
        check(time, validTimeStamp);
        return Players.find({time: { $lte: time}}).count();
    },
    'players.search'(query){
        check(query, String);
        if(query === ''){
            return Players.find({}, {
                sort: {createdAt: -1},
                limit: 10
            }).fetch();
        }
        query = '.*' + query + '.*';
        return Players.find({
            "name": {$regex: query}
        }, {limit: 10}).fetch();
    },
    'player.get'(id){
        check(id, String);
        return Players.findOne(id);
    },
    'downloadCsv'(){
        let players = Players.find({}).fetch();
        let csv = 'name;email;score';
        players.forEach((player, i) => {
            csv += '\n' + player.name + ';' +
                player.email + ';' +
                player.time;
        });
        return new Buffer(csv).toString('base64');


    }

});