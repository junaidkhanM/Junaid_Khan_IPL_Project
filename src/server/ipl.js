module.exports.matchesPerYear = (matches) => {
  let matchesArr = [];
  for (let match of matches) {
    matchesArr.push(match);
  }
  let result = {};
  matchesArr
    .map((obj) => obj["season"])
    .forEach((element) => {
      if (element in result) {
        result[element] += 1;
      } else {
        result[element] = 1;
      }
    });
  return result;
};

module.exports.matchesWonPerYear = (matches) => {
  let matchesArr = [];
  for (let match of matches) {
    matchesArr.push(match);
  }
  let countWon = {};
  let result = {};

  matchesArr.forEach((element) => {
    if (element.season in result) {
      if (element.winner in countWon) countWon[element.winner] += 1;
      else countWon[element.winner] = 1;

      result[element.season] = countWon;
    } else {
      countWon = {};
      result[element.season] = countWon;
    }
  });

  return result;
};

module.exports.extraRunPerTeamIn2016 = (matches, deliveries) => {
  let matchesArr = [],
    deliveriesArr = [];

  for (let match of matches) {
    matchesArr.push(match);
  }
  for (let delivery of deliveries) {
    deliveriesArr.push(delivery);
  }

  let result = {};
  let matchId = 0;

  matchesArr.forEach((element) => {
    if (element.season == 2016) {
      matchId = element.id;
    }

    deliveriesArr.forEach((delivery) => {
      if (delivery.match_id == matchId) {
        if (delivery.bowling_team in result)
          result[delivery.bowling_team] += Number(delivery.extra_runs);
        else result[delivery.bowling_team] = Number(delivery.extra_runs);
      }
    });
  });

  return result;
};

module.exports.top10EconomicalBowlersIn2015 = (matches, deliveries) => {
  let matchesArr = [],
    deliveriesArr = [];

  for (let match of matches) {
    matchesArr.push(match);
  }
  for (let delivery of deliveries) {
    deliveriesArr.push(delivery);
  }

  let economy = {};
  let matchId = 0;

  matchesArr.forEach((element) => {
    if (element.season == 2016) {
      matchId = element.id;
    }

    deliveriesArr.forEach((delivery) => {
      if (delivery.match_id == matchId) {
        if (delivery.bowler in economy)
          economy[delivery.bowler] += Number(
            (delivery.total_runs / delivery.over).toFixed(2)
          );
        else
          economy[delivery.bowler] = Number(
            (delivery.total_runs / delivery.over).toFixed(2)
          );
      }
    });
  });

  let economyInSortedOrder = Object.entries(economy).sort(
    (a, b) => a[1] - b[1]
  );
  let top10 = economyInSortedOrder.slice(0, 10);
  let result = Object.fromEntries(top10)
  return result;
};
