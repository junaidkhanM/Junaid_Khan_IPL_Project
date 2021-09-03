let matchesPerYear = (matches) => {
  try {
    return matches.reduce((accu, { season }) => {
      accu[season] = accu[season] ? (accu[season] += 1) : (accu[season] = 1);
      return accu;
    }, {});
  } catch (error) {
    console.error('Data is not appropriate');
  }
};

let matchesWonPerYear = (matches) => {
  let result = {};

  matches.reduce((accum, { season, winner }) => {
    if (!(season in result)) {
      result[season] = {};
    }
    accum[season][winner] = accum[season][winner]
      ? (accum[season][winner] += 1)
      : (accum[season][winner] = 1);

    return accum;
  }, result);

  return result;
};

let extraRunPerTeamIn2016 = (matches, deliveries) => {
  let matchesId = [];

  matches
    .map((row) => [row.id, row.season])
    .filter((element) => element[1] === '2016')
    .forEach((arr) => matchesId.push(arr[0]));

  return deliveries.reduce((accu, { match_id, bowling_team, extra_runs }) => {
    if (matchesId.includes(match_id)) {
      accu[bowling_team] = accu[bowling_team]
        ? (accu[bowling_team] += Number(extra_runs))
        : (accu[bowling_team] = Number(extra_runs));
    }
    return accu;
  }, {});
};

let top10EconomicalBowlersIn2015 = (matches, deliveries) => {
  let matchesId = [];
  let economy = {};

  matches
    .map((row) => [row.id, row.season])
    .filter((element) => element[1] === '2015')
    .forEach((elem) => matchesId.push(elem[0]));

  deliveries.reduce((accu, { match_id, bowler, over, total_runs }) => {
    if (matchesId.includes(match_id)) {
      economy[bowler] = accu[bowler]
        ? (accu[bowler] += Number((total_runs / over).toFixed(2)))
        : (accu[bowler] = Number((total_runs / over).toFixed(2)));
    }
    return accu;
  }, economy);

  let economyInSortedOrder = Object.entries(economy)
    .sort((a, b) => a[1] - b[1])
    .slice(0, 10);

  return Object.fromEntries(economyInSortedOrder);
};

module.exports = {
  matchesPerYear,
  matchesWonPerYear,
  extraRunPerTeamIn2016,
  top10EconomicalBowlersIn2015,
};
