module.exports.matchesPerYear = (matches) => {
  const countPlayed = {};
  for (let match of matches) {
    match.forEach((element) => {
      if (countPlayed[element.season]) {
        countPlayed[element.season] += 1;
      } else {
        countPlayed[element.season] = 1;
      }
    });
  }
  return countPlayed;
};

module.exports.matchesWonPerYear = (matches) => {
  let countWon = {};
  let result = {};

  for (let match of matches) {
    match.forEach((element) => {
      if (element.season in result) {
        if (element.winner in countWon) countWon[element.winner] += 1;
        else countWon[element.winner] = 1;

        result[element.season] = countWon;
      } else {
        countWon = {};
        result[element.season] = countWon;
      }
    });
  }

  return result;
};

module.exports.extraRunPerTeamIn2016 = (matches, deliveries) => {
  let result = {};
  let matchId;
  for (let match of matches) {
    match.forEach((element) => {
      if (element.season == 2016) {
        matchId = element.id;
      }
      for (let delivery of deliveries) {
        delivery.forEach((element) => {
          if (element.match_id == matchId) {
            if (element.bowling_team in result) {
              result[element.bowling_team] += Number(element.extra_runs);
            } else {
              result[element.bowling_team] = Number(element.extra_runs);
            }
          }
        });
      }
    });
  }
  return result;
};

module.exports.top10EconomicalBowlersIn2015 = (matches, deliveries) => {
  let matchId = 0;
  let economy = {};
  for (let match of matches) {
    match.forEach((element) => {
      if (element.season == 2015) {
        matchId = element.id;
      }

      for (let delivery of deliveries) {
        delivery.forEach((element) => {
          if (element.match_id == matchId) {
            if (element.bowler in economy) {
              economy[element.bowler] += Number(
                (element.total_runs / element.over).toFixed(2)
              );
            } else {
              economy[element.bowler] = Number(
                (element.total_runs / element.over).toFixed(2)
              );
            }
          }
        });
      }
    });
  }

  let economyInSortedOrder = Object.entries(economy).sort(
    (a, b) => a[1] - b[1]
  );
  let result = economyInSortedOrder.slice(0, 10);
  let resultObj = {};
  Object.assign(resultObj, result);
  return resultObj;
};
