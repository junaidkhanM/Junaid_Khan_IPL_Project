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
  visMatchesWonPerYear(data[1]);
  visExtraRunPerTeamIn2016(data[2]);
  visTop10EconomicalBowlersIn2015(data[3]);
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
  let won = [];
  let year = [];
  let teamName = [];
  for (let key in matchesWonPerYear) {
    year.push(key);
  }
  let arr = Object.values(matchesWonPerYear);
  console.log(arr);
  for (let i = 0; i < arr.length; i++) {
    for (let val in arr[i]) {
      if (!(val in teamName)) {
        teamName.push(val);
      }
      won.push([val, arr[i][val]]);
    }
  }

  Highcharts.chart("matchesWonPerYear", {
    chart: {
      type: "bar",
    },
    title: {
      text: "Stacked bar chart",
    },
    xAxis: {
      categories: teamName,
    },
    yAxis: {
      min: 0,
      title: {
        text: "Total fruit consumption",
      },
    },
    legend: {
      reversed: true,
    },
    plotOptions: {
      series: {
        stacking: "normal",
      },
    },
    series: [
      {
        name: year[0],
        data: won,
      },
      {
        name: year[1],
        data: won,
      },
      {
        name: year[2],
        data: won,
      },
    ],
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
