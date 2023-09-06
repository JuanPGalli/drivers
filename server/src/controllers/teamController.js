const axios = require("axios");
const { Teams } = require("../db");

const getDriversTeams = async function () {
  const driverTeams = await Teams.findAll();

  if (!driverTeams.length) {
    const rawArray = (await axios.get(`http://localhost:5000/drivers`)).data;
    const rawTeams = rawArray.map((elem) => elem.teams);

    const res = rawTeams.join(",").split(",");

    const allTeams = [];
    res.forEach((word) => {
      if (!allTeams.includes(word) && word.length > 0)
        allTeams.push(word.trim());
    });
    const result = allTeams.map((temp) =>
      Teams.findOrCreate({
        where: {
          name: temp,
        },
      })
    );
    if (result.length > 0)
      return "All the API Teams where succefully saved in the Data Base";
    else throw new Error("No API Teams where saved in the Data Base");
  }
  return driverTeams;
};

module.exports = { getDriversTeams };
