const { Router } = require("express");
const {
  getDriversHandler,
  getDriverIdHandler,
  postDriverHandler,
} = require("../handlers/driverHandler");

const driverRouter = Router();

// query
driverRouter.get("/", getDriversHandler);

// params
driverRouter.get("/:id", getDriverIdHandler);

// body
driverRouter.post("/", postDriverHandler);

module.exports = driverRouter;
