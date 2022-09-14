import express, { Router } from "express";
import AppConfigs from "./modules/base/configs/AppConfigs";
import TaskController from "./modules/public/tasks/TaskController";
import UserController from "./modules/public/users/UserController";
import Middleware from "./modules/shared/middleware/Middleware";

const appRouter: Router = express.Router({
  ...AppConfigs.expressRouter(),
});

const {
  isAuth,
  isValidEmail,
  validateBody,
  checkRequestBodyKeys,
} = Middleware;

//Users
appRouter.post("/register", 
  validateBody, 
  checkRequestBodyKeys([
    "email",
    "password"
  ]),
  isValidEmail,
  UserController.registerUser
);
appRouter.post("/login",
  validateBody,
  checkRequestBodyKeys([
    "email",
    "password",  
  ]),
  isValidEmail,
  UserController.login
);
appRouter.get("/user", isAuth, UserController.getUser);

//Tasks
appRouter.post("/create-task", 
  isAuth, 
  validateBody, 
  checkRequestBodyKeys([
    "name",
  ]),
  TaskController.createTask
);
appRouter.get("/list-tasks", isAuth, TaskController.getAllTasks);

export default appRouter;
