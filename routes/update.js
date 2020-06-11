const express = require('express');
const updateRouter = express.Router();

const userController = require("../controllers/user");

updateRouter.get("/update/:username", userController.getUpdate);
updateRouter.post("/update/:username", userController.update);

module.exports = updateRouter;