import { Meteor } from 'meteor/meteor'
import { Mongo } from 'meteor/mongo'
import { check, Match } from 'meteor/check'

export const Players = new Mongo.Collection('players')

if (Meteor.isServer) {
    // This code only runs on the server
  Meteor.publish('leaderboard', function leaderboard() {
    return Players.find({}, {
      sort: { time: 1 },
      limit: 10,
    })
  })

  Meteor.publish('latestEntries', function latestEntries(size) {
    check(size, Number)
    return Players.find({}, {
      sort: { createdAt: -1 },
      limit: size,
    })
  })
}

const validEmail = Match.Where(function validEmail(email) {
  check(email, String)
  const emailValidationRegex =
  /(^[\w-]+(\.[\w-]+)*@([\w-]+(\.[\w-]+)*?\.[a-zA-Z]{2,}|(\d{1,3}\.){3}\d{1,3})(:\d{4})?$)/g
  return emailValidationRegex.test(email)
})

const validTimeStamp = Match.Where(function validTimeStamp(timeStamp) {
  check(timeStamp, String)
  const regexp = /([0-9]{2}:[0-9]{2}\.[0-9]{3})/g
  return regexp.test(timeStamp)
})

const playerCheck = {
  _id: Match.Maybe(String),
  createdAt: Match.Maybe(Date),
  name: String,
  email: validEmail,
  time: validTimeStamp,
}

Meteor.methods({
  'players.insert'(name, email, time) {
    check(name, String)
    check(email, validEmail)
    check(time, validTimeStamp)

    Players.insert({
      name,
      email,
      time,
      createdAt: new Date(),
    })
  },
  'player.update'(player) {
    check(player, playerCheck)
    check(player.email, validEmail)
    check(player.time, validTimeStamp)
    Players.update(player._id, {
      $set: {
        name: player.name,
        email: player.email,
        time: player.time,
      },
    })
  },
  'player.position'(time) {
    check(time, validTimeStamp)
    return Players.find({ time: { $lte: time } }).count()
  },
  'players.search'(query) {
    check(query, String)
    if (query === '') {
      return Players.find({}, {
        sort: { createdAt: -1 },
        limit: 10,
      }).fetch()
    }
    const newQuery = `.*${query}.*`
    return Players.find({
      $or: [
        {
          name: { $regex: newQuery, $options: 'i' },
        },
        {
          email: { $regex: newQuery, $options: 'i' },
        },
      ],
    }, { limit: 10 }).fetch()
  },
  'player.get'(id) {
    check(id, String)
    return Players.findOne(id)
  },
  'downloadCsv'() {
    const players = Players.find({}).fetch()
    let csv = 'name;email;score'
    players.forEach((player) => {
      csv += `\n${player.name};${player.email};${player.time}`
    })
    return new Buffer(csv).toString('base64')
  },
})
