const routes = require("express").Router();
const TaskController = require("../controller/TaskController");

routes.get("/", TaskController.getIndex);
routes.post("/create", TaskController.createTask);

module.exports = routes;
