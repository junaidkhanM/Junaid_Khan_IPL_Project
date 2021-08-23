module.exports.matchesPerYear = (matches) => {
  const countPlayed = {};
  for (let match of matches) {
    const season = match.season;
    if (countPlayed[season]) {
      countPlayed[season] += 1;
    } else {
      countPlayed[season] = 1;
    }
  }
  return countPlayed;
};

module.exports.matchesWonPerYear = (matches) => {
  let countWon = {};
  let result = {};
  for (let match of matches) {
    const winner = match.winner;
    const season = match.season;
    if (season in result) {
      if (winner in countWon) countWon[winner] += 1;
      else countWon[winner] = 1;

      result[season] = countWon;
    } else {
      countWon = {};
      result[season] = countWon;
    }
  }

  return result;
};

module.exports.extraRunPerTeamIn2016 = (matches, deliveries) => {
  let result = {};
  let matchId = 0;
  for (let match of matches) {
    const season = match.season;
    const id = match.id;
    if (season == 2016) {
      matchId = id;
    }

    for (let delivery of deliveries) {
      const match_id = delivery.match_id;
      const bowling_team = delivery.bowling_team;
      const extra_runs = delivery.extra_runs;
      if (match_id == matchId) {
        if (bowling_team in result) {
          result[bowling_team] += Number(extra_runs);
        } else {
          result[bowling_team] = Number(extra_runs);
        }
      }
    }
  }
  return result;
};

module.exports.top10EconomicalBowlersIn2015 = (matches, deliveries) => {
  let matchId = 0;
  let economy = {};
  for (let match of matches) {
    const season = match.season;
    const id = match.id;
    if (season == 2015) {
      matchId = id;
    }

    for (let delivery of deliveries) {
      const match_id = delivery.match_id;
      const bowler = delivery.bowler;
      const over = delivery.over;
      const total_runs = delivery.total_runs;
      if (match_id == matchId) {
        if (bowler in economy) {
          economy[bowler] += Number(total_runs / over);
        } else {
          economy[bowler] = Number(total_runs / over);
        }
      }
    }
  }

  let economyInSortedOrder = Object.entries(economy).sort(
    (a, b) => a[1] - b[1]
  );
  let result = economyInSortedOrder.slice(0, 10);
  return result;
};
