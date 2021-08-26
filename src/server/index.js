const csv = require("csvtojson");
const fs = require("fs");
const matchesCsv = "src/data/matches.csv";
const deliveriesCsv = 'src/data/deliveries.csv'
const { matchesPerYear, matchesWonPerYear, extraRunPerTeamIn2016, top10EconomicalBowlersIn2015 } = require("./ipl");

let matchesArray = [];
let deliveriesArray = [];

csv()
  .fromFile(matchesCsv)
  .then((matchesObj) => {
    csv()
      .fromFile(deliveriesCsv)
      .then((deliveriesObj) => {

        matchesArray.push(matchesObj);
        deliveriesArray.push(deliveriesObj);

        let matchesPlayed = matchesPerYear(matchesArray);
        saveDataToJsonFile(matchesPlayed, 'matchesPerYear');
        let matchesWon = matchesWonPerYear(matchesArray);
        saveDataToJsonFile(matchesWon, 'matchesWonPerYear');
        let extraRuns = extraRunPerTeamIn2016(matchesArray, deliveriesArray);
        saveDataToJsonFile(extraRuns, 'extraRunPerTeamIn2016');
        let top10EconomicalBowlers = top10EconomicalBowlersIn2015(matchesArray, deliveriesArray);
        saveDataToJsonFile(top10EconomicalBowlers, 'top10EconomicalBowlersIn2015')
      });
  });

const saveDataToJsonFile = (data, fileName) => {
  fs.writeFile(
    "src/public/output/" + fileName + ".json",
    JSON.stringify(data, null, 2),
    "utf-8",
    (err) => {
      if (err) {
        console.log(err);
      }
    }
  );
};
