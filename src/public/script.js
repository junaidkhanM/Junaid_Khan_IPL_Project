function fetchAll(urls) {
  var list = [];
  let result = [];
  urls.forEach((url, i) => {
    list.push(
      fetch("./output/" + url + ".json").then((res) => (result[i] = res.json()))
    );
  });

  Promise.all(list).then(visualizeData);
}

let urls = [
  "matchesPerYear",
  "matchesWonPerYear",
  "extraRunPerTeamIn2016",
  "top10EconomicalBowlersIn2015",
];
fetchAll(urls);

function visualizeData(data) {
  visMatchesPerYear(data[0]);
  visExtraRunPerTeamIn2016(data[2]);
  visTop10EconomicalBowlersIn2015(data[3]);
  visMatchesWonPerYear(data[1]);
  return;
}

function visMatchesPerYear(matchesPerYear) {
  const dataArr = [];
  for (let year in matchesPerYear) {
    dataArr.push([year, matchesPerYear[year]]);
  }

  Highcharts.chart("matchesPerYear", {
    chart: {
      type: "column",
    },
    title: {
      text: "Matches Played Per Year",
    },
    subtitle: {
      text: 'Source: <a href="https://www.kaggle.com/manasgarg/ipl">IPL Data Set</a>',
    },
    xAxis: {
      type: "category",
    },
    yAxis: {
      min: 0,
      title: {
        text: "Matches",
      },
    },
    series: [
      {
        name: "Years",
        data: dataArr,
      },
    ],
  });
}

function visMatchesWonPerYear(matchesWonPerYear) {
  let years = [];
  let CSK = [],
    DD = [],
    RCB = [],
    KKR = [],
    RR = [],
    KXIP = [],
    DC = [],
    MI = [],
    PW = [],
    KTK = [],
    SRH = [],
    GR = [],
    RPS = [];

  Object.entries(matchesWonPerYear).forEach((element) => {
    const [key, value] = element;
    years.push(key);
    const index = parseInt(key) - 2008;
    Object.entries(value).forEach((data) => {
      const [keys, values] = data;
      console.log
      switch (keys) {
        case 'Chennai Super Kings':
          CSK[index] = values;
          break;
        case 'Delhi Daredevils':
          DD[index] = values;
          break;
        case 'Royal Challengers Bangalore':
          RCB[index] = values;
          break;
        case 'Kolkata Knight Riders':
          KKR[index] = values;
          break;
        case 'Rajasthan Royals':
          RR[index] = values;
          break;
        case 'Kings XI Punjab':
          KXIP[index] = values;
          break;
        case 'Deccan Chargers':
          DC[index] = values;
          break;
        case 'Mumbai Indians':
          MI[index] = values;
          break;
        case 'Pune Warriors':
          PW[index] = values;
          break;
        case 'Kochi Tuskers Kerala':
          KTK[index] = values;
          break;
        case 'Sunrisers Hyderabad':
          SRH[index] = values;
          break;
        case 'Gujarat Lions':
          GR[index] = values;
          break;
        default: RPS[index] = values;
        break;
      }
    });
  });

  Highcharts.chart('matchesWonPerYear', {
    chart: {
        type: 'column'
    },
    title: {
        text: 'Matches Won Per Year'
    },
    xAxis: {
        categories: years
    },
    yAxis: {
        min: 0,
        title: {
            text: 'Number of Matches Won'
        }
    },
    series: [{
      name: 'Chennai Super Kings',
      data: CSK
    }, {
      name: 'Delhi Daredevils',
      data: DD
    }, {
      name: 'Royal Challengers Bangalore',
      data: RCB
    }, {
      name: 'Kolkata Knight Riders',
      data: KKR
    }, {
      name: 'Rajasthan Royals',
      data: RR
    }, {
      name: 'Kings XI Punjab',
      data: KXIP
    }, {
      name: 'Deccan Chargers',
      data: DC
    }, {
      name: 'Mumbai Indians',
      data: MI
    }, {
      name: 'Pune Warriors',
      data: PW
    }, {
      name: 'Kochi Tuskers Kerala',
      data: KTK
    }, {
      name: 'Sunrisers Hyderabad',
      data: SRH
    }, {
      name: 'Gujarat Lions',
      data: GR
    }, {
      name: 'Rising Pune Supergiants',
      data: RPS
    }]
  });
}

function visExtraRunPerTeamIn2016(extraRunPerTeamIn2016) {
  const dataArr = [];
  for (let team in extraRunPerTeamIn2016) {
    dataArr.push([team, extraRunPerTeamIn2016[team]]);
  }

  Highcharts.chart("extraRunPerTeamIn2016", {
    chart: {
      type: "column",
    },
    title: {
      text: "Extra Run Per Team In Year 2016",
    },
    subtitle: {
      text: 'Source: <a href="https://www.kaggle.com/manasgarg/ipl">IPL Data Set</a>',
    },
    xAxis: {
      type: "category",
    },
    yAxis: {
      min: 0,
      title: {
        text: "Extra Runs",
      },
    },
    series: [
      {
        name: "Teams",
        data: dataArr,
      },
    ],
  });
}

function visTop10EconomicalBowlersIn2015(top10EconomicalBowlersIn2015) {
  Highcharts.chart("top10EconomicalBowlersIn2015", {
    chart: {
      type: "column",
    },
    title: {
      text: "Top 10 Economical Bowlers In Year 2015",
    },
    subtitle: {
      text: 'Source: <a href="https://www.kaggle.com/manasgarg/ipl">IPL Data Set</a>',
    },
    xAxis: {
      type: "category",
    },
    yAxis: {
      min: 0,
      title: {
        text: "Economy",
      },
    },
    series: [
      {
        name: "Bowlers",
        data: top10EconomicalBowlersIn2015,
      },
    ],
  });
}
