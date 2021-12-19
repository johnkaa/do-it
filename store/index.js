import { onValue, ref } from "firebase/database"
import db from "../static/db"

export const state = () => ({
  user: {},
  players: [],
  games: [],
  news: [],
  teams: [],
  payments: [],
  events: [],
  tournaments: [],
  leagues: []
})
export const getters = {
  getUser(state) {
    return state.user
  },
  getPlayers(state) {
    return state.players
  },
  getGames(state) {
    return state.games
  },
  getNews(state) {
    return state.news
  },
  getTeams(state) {
    return state.teams
  },
  getPayments(state) {
    return state.payments
  },
  getEvents(state) {
    return state.events
  },
  getTournaments(state) {
    return state.tournaments
  },
  getLeagues(state) {
    return state.leagues
  }
}
export const mutations = {
  setUser(state, user) {
    state.user = user
  },
  setPlayers(state, players) {
    state.players = players
  },
  setPlayerInfo(state, player) {
    if(player.delete) {
      return delete state.players[player.id]
    }
    if(!state.players[player.id]) {
      state.players[player.id] = {
        id: player.id,
        dateRegistration: player.now,
        eur: 0,
        dtc: 0,
        email: '123456',
        password: '123456',
        emailVerified: false,
        img: 'https://i.pinimg.com/736x/df/72/d5/df72d51685e99a265ad186bada408e27.jpg',
        lvl: 0,
        rank: 'user',
        subscribe: 'free'
      }
    }
    state.players[player.id].name = player.name
    state.players[player.id].username = player.username
    state.players[player.id].sex = player.sex
    state.players[player.id].country = player.country
    state.players[player.id].dateOfBirth = player.date
    state.players[player.id].age = player.age
    state.players[player.id].img = player.img
  },
  setGames(state, games) {
    state.games = games
  },
  setGameInfo(state, game) {
    if(game.delete) {
      return delete state.games[game.id]
    }
    if(!state.games[game.id]) {
      state.games[game.id] = {
        id: game.id
      }
    }
    state.games[game.id].title = game.title
    state.games[game.id].description = game.description
    state.games[game.id].img = game.img
    state.games[game.id].mobileBannerImg = game.mobileBannerImg
    state.games[game.id].gameIconImg = game.gameIconImg
    state.games[game.id].gameLogoImg = game.gameLogoImg
    state.games[game.id].backgroundImg = game.backgroundImg
    state.games[game.id].tournamentsActive = game.tournamentsActive
    state.games[game.id].mapVotingActive = game.mapVotingActive
    state.games[game.id].serverSystem = game.serverSystem
    state.games[game.id].maps = game.maps
  },
  setNews(state, news) {
    state.news = news
  },
  setNewsInfo(state, news) {
    if(news.delete) {
      return delete state.news[news.id]
    }
    if(!state.news[news.id]) {
      state.news[news.id] = {
        id: news.id
      }
    }
    state.news[news.id].title = news.title
    state.news[news.id].text = news.text
    state.news[news.id].author = news.author
    state.news[news.id].game = news.game
    state.news[news.id].img = news.img
    state.news[news.id].date = news.date
  },
  setTeams(state, teams) {
    state.teams = teams
  },
  setTeamInfo(state, teams) {
    if(teams.delete) {
      return delete state.teams[teams.id]
    }
    if(!state.teams[teams.id]) {
      state.teams[teams.id] = {
        id: teams.id
      }
    }
    state.teams[teams.id].name = teams.name
    state.teams[teams.id].game = teams.game
    state.teams[teams.id].leader = teams.leader
    state.teams[teams.id].country = teams.country
    state.teams[teams.id].creationDate = teams.date
    state.teams[teams.id].website = teams.website
    state.teams[teams.id].img = teams.img
  },
  setPayments(state, payments) {
    state.payments = payments
  },
  setEvents(state, events) {
    state.events = events
  },
  setEventInfo(state, events) {
    if(events.delete) {
      return delete state.events[events.id]
    }
    if(!state.events[events.id]) {
      state.events[events.id] = {
        id: events.id
      }
    }
    state.events[events.id].title = events.title
    state.events[events.id].valueOfDate = events.valueOfDate
    state.events[events.id].dateOfStart = events.dateOfStart
    state.events[events.id].dateOfEnd = events.dateOfEnd
    state.events[events.id].website = events.website || ''
    state.events[events.id].game = events.game
  },
  setTournaments(state, tournaments) {
    state.tournaments = tournaments
  },
  setTournamentInfo(state, tournaments) {
    if(tournaments.delete) {
      return delete state.tournaments[tournaments.id]
    }
    if(!state.tournaments[tournaments.id]) {
      state.tournaments[tournaments.id] = {
        id: tournaments.id
      }
    }
    state.tournaments[tournaments.id].host = tournaments.host
    state.tournaments[tournaments.id].title = tournaments.title
    state.tournaments[tournaments.id].img = tournaments.img
    state.tournaments[tournaments.id].bg = tournaments.bg
    state.tournaments[tournaments.id].quickRules = tournaments.quickRules
    state.tournaments[tournaments.id].game = tournaments.game
    state.tournaments[tournaments.id].type = tournaments.type
    state.tournaments[tournaments.id].format = tournaments.format
    state.tournaments[tournaments.id].mode = tournaments.mode
    state.tournaments[tournaments.id].mapVoting = tournaments.mapVoting
    state.tournaments[tournaments.id].registrationType = tournaments.registrationType
    state.tournaments[tournaments.id].startDate = tournaments.startDate
    state.tournaments[tournaments.id].estimatedEndDate = tournaments.estimatedEndDate
    state.tournaments[tournaments.id].thirdPlace = tournaments.thirdPlace
    state.tournaments[tournaments.id].checkIn = tournaments.checkIn
    state.tournaments[tournaments.id].checkInTime = tournaments.checkInTime
    state.tournaments[tournaments.id].entryPrice = tournaments.entryPrice
    state.tournaments[tournaments.id].league = tournaments.league
    state.tournaments[tournaments.id].onlyLeague = tournaments.onlyLeague
    state.tournaments[tournaments.id].prizePool = tournaments.prizePool
    state.tournaments[tournaments.id].maxPlayers = tournaments.maxPlayers
    state.tournaments[tournaments.id].prizePlace1 = tournaments.prizePlace1
    state.tournaments[tournaments.id].prizePlace2 = tournaments.prizePlace2
    state.tournaments[tournaments.id].prizePlace3 = tournaments.prizePlace3
    state.tournaments[tournaments.id].prizeRo8 = tournaments.prizeRo8
    state.tournaments[tournaments.id].prizeRo16 = tournaments.prizeRo16
    state.tournaments[tournaments.id].prizeRo32 = tournaments.prizeRo32
    state.tournaments[tournaments.id].prizeType = tournaments.prizeType
    state.tournaments[tournaments.id].donations = tournaments.donations
    state.tournaments[tournaments.id].allowTournament = tournaments.allowTournament
    state.tournaments[tournaments.id].allowMatch = tournaments.allowMatch
    state.tournaments[tournaments.id].xboxAccount = tournaments.xboxAccount
    state.tournaments[tournaments.id].steamAccount = tournaments.steamAccount
    state.tournaments[tournaments.id].riotAccount = tournaments.riotAccount
    state.tournaments[tournaments.id].blizzardAccount = tournaments.blizzardAccount
    state.tournaments[tournaments.id].minAge = tournaments.minAge
    state.tournaments[tournaments.id].europe = tournaments.europe
    state.tournaments[tournaments.id].australia = tournaments.australia
    state.tournaments[tournaments.id].asia = tournaments.asia
    state.tournaments[tournaments.id].america = tournaments.america
    state.tournaments[tournaments.id].platformPc = tournaments.platformPc
    state.tournaments[tournaments.id].platformXbox = tournaments.platformXbox
    state.tournaments[tournaments.id].platformPs4 = tournaments.platformPs4
    state.tournaments[tournaments.id].platformPs5 = tournaments.platformPs5
    state.tournaments[tournaments.id].lobby = tournaments.lobby
    state.tournaments[tournaments.id].extraMode = tournaments.extraMode
    state.tournaments[tournaments.id].veto = tournaments.veto
    state.tournaments[tournaments.id].discordUrl = tournaments.discordUrl
    state.tournaments[tournaments.id].facebookUrl = tournaments.facebookUrl
    state.tournaments[tournaments.id].twitterUrl = tournaments.twitterUrl
    state.tournaments[tournaments.id].vkUrl = tournaments.vkUrl
    state.tournaments[tournaments.id].twitchUrl = tournaments.twitchUrl
    state.tournaments[tournaments.id].youtubeUrl = tournaments.youtubeUrl
    state.tournaments[tournaments.id].streams = tournaments.streams
    state.tournaments[tournaments.id].sponsors = tournaments.sponsors
    state.tournaments[tournaments.id].rules = tournaments.rules
  },
  setLeagues(state, leagues) {
    state.leagues = leagues
  },
  setLeagueInfo(state, leagues) {
    if(leagues.delete) {
      return delete state.leagues[leagues.id]
    }
    if(!state.leagues[leagues.id]) {
      state.leagues[leagues.id] = {
        id: leagues.id
      }
    }
    state.leagues[leagues.id].host = leagues.host
    state.leagues[leagues.id].title = leagues.title
    state.leagues[leagues.id].img = leagues.img
    state.leagues[leagues.id].bg = leagues.bg
    state.leagues[leagues.id].quickRules = leagues.quickRules
    state.leagues[leagues.id].game = leagues.game
    state.leagues[leagues.id].type = leagues.type
    state.leagues[leagues.id].format = leagues.format
    state.leagues[leagues.id].mode = leagues.mode
    state.leagues[leagues.id].mapVoting = leagues.mapVoting
    state.leagues[leagues.id].registrationType = leagues.registrationType
    state.leagues[leagues.id].startDate = leagues.startDate
    state.leagues[leagues.id].estimatedEndDate = leagues.estimatedEndDate
    state.leagues[leagues.id].thirdPlace = leagues.thirdPlace
    state.leagues[leagues.id].checkIn = leagues.checkIn
    state.leagues[leagues.id].checkInTime = leagues.checkInTime
    state.leagues[leagues.id].entryPrice = leagues.entryPrice
    state.leagues[leagues.id].prizePool = leagues.prizePool
    state.leagues[leagues.id].maxPlayers = leagues.maxPlayers
    state.leagues[leagues.id].prizePlace1 = leagues.prizePlace1
    state.leagues[leagues.id].prizePlace2 = leagues.prizePlace2
    state.leagues[leagues.id].prizePlace3 = leagues.prizePlace3
    state.leagues[leagues.id].prizeRo8 = leagues.prizeRo8
    state.leagues[leagues.id].prizeRo16 = leagues.prizeRo16
    state.leagues[leagues.id].prizeRo32 = leagues.prizeRo32
    state.leagues[leagues.id].prizeType = leagues.prizeType
    state.leagues[leagues.id].donations = leagues.donations
    state.leagues[leagues.id].xboxAccount = leagues.xboxAccount
    state.leagues[leagues.id].steamAccount = leagues.steamAccount
    state.leagues[leagues.id].riotAccount = leagues.riotAccount
    state.leagues[leagues.id].blizzardAccount = leagues.blizzardAccount
    state.leagues[leagues.id].minAge = leagues.minAge
    state.leagues[leagues.id].europe = leagues.europe
    state.leagues[leagues.id].australia = leagues.australia
    state.leagues[leagues.id].asia = leagues.asia
    state.leagues[leagues.id].america = leagues.america
    state.leagues[leagues.id].platformPc = leagues.platformPc
    state.leagues[leagues.id].platformXbox = leagues.platformXbox
    state.leagues[leagues.id].platformPs4 = leagues.platformPs4
    state.leagues[leagues.id].platformPs5 = leagues.platformPs5
    state.leagues[leagues.id].lobby = leagues.lobby
    state.leagues[leagues.id].extraMode = leagues.extraMode
    state.leagues[leagues.id].veto = leagues.veto
    state.leagues[leagues.id].discordUrl = leagues.discordUrl
    state.leagues[leagues.id].facebookUrl = leagues.facebookUrl
    state.leagues[leagues.id].twitterUrl = leagues.twitterUrl
    state.leagues[leagues.id].vkUrl = leagues.vkUrl
    state.leagues[leagues.id].twitchUrl = leagues.twitchUrl
    state.leagues[leagues.id].youtubeUrl = leagues.youtubeUrl
    state.leagues[leagues.id].streams = leagues.streams
    state.leagues[leagues.id].sponsors = leagues.sponsors
    state.leagues[leagues.id].tournament = leagues.tournament
    state.leagues[leagues.id].rules = leagues.rules
  }
}
export const actions = {
  setUserAction(context, uid) {
    const usersRef = ref(db, 'users')
    onValue(usersRef, (snapshot) => {
      const users = snapshot.val()
      Object.keys(users).forEach((userDB) => {
        if(users[userDB].uid === uid) {
          context.commit('setUser', users[userDB])
        }
      })
    })
  },
  setPlayersAction(context) {
    const usersRef = ref(db, 'users')
    onValue(usersRef, (snapshot) => {
      context.commit('setPlayers', snapshot.val())
    })
  },
  setPlayerInfoAction(context, player) {
    context.commit('setPlayerInfo', player)
  },
  setGamesAction(context) {
    const gamesRef = ref(db, 'games')
    onValue(gamesRef, (snapshot) => {
      context.commit('setGames', snapshot.val())
    })
  },
  setGameInfoAction(context, game) {
    context.commit('setGameInfo', game)
  },
  setNewsAction(context) {
    const newsRef = ref(db, 'news')
    onValue(newsRef, (snapshot) => {
      context.commit('setNews', snapshot.val())
    })
  },
  setNewsInfoAction(context, news) {
    context.commit('setNewsInfo', news)
  },
  setTeamsAction(context) {
    const teamsRef = ref(db, 'teams')
    onValue(teamsRef, (snapshot) => {
      context.commit('setTeams', snapshot.val())
    })
  },
  setTeamInfoAction(context, teams) {
    context.commit('setTeamInfo', teams)
  },
  setPaymentsAction(context) {
    const paymentsRef = ref(db, 'payments')
    onValue(paymentsRef, (snapshot) => {
      context.commit('setPayments', snapshot.val())
    })
  },
  setEventsAction(context) {
    const eventsRef = ref(db, 'events')
    onValue(eventsRef, (snapshot) => {
      context.commit('setEvents', snapshot.val())
    })
  },
  setEventInfoAction(context, teams) {
    context.commit('setEventInfo', teams)
  },
  setTournamentsAction(context) {
    const tournamentsRef = ref(db, 'tournaments')
    onValue(tournamentsRef, (snapshot) => {
      context.commit('setTournaments', snapshot.val())
    })
  },
  setTournamentInfoAction(context, tournaments) {
    context.commit('setTournamentInfo', tournaments)
  },
  setLeaguesAction(context) {
    const leaguesRef = ref(db, 'leagues')
    onValue(leaguesRef, (snapshot) => {
      context.commit('setLeagues', snapshot.val())
    })
  },
  setLeagueInfoAction(context, leagues) {
    context.commit('setLeagueInfo', leagues)
  }
}
