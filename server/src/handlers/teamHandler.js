const { getDriversTeams } = require("../controllers/teamController");

const getDriversHandler = async (req, res) => {
  try {
    const response = await getDriversTeams();
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { getDriversHandler };
