const { Router } = require("express");
const { getDriversHandler } = require("../handlers/teamHandler");

const teamRouter = Router();

teamRouter.get("/", getDriversHandler);

module.exports = teamRouter;
