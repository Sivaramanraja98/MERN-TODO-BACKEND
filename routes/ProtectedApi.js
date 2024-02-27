const express = require("express");
const CreateTodo = require("../controllers/Todo.controller");
const AuthMiddleware = require("../middlewares/Authmiddleware");
const { check } = require("express-validator");
const GetTodos = require("../controllers/TodoList.controller");
const MarkTodo = require("../controllers/MarkTodo.controller");
const RemoveTodo = require("../controllers/RemoveTodo.controller");

const apiProtected = express.Router();

apiProtected.post(
  "/createTodo",
  [check("desc", "Todo Description is required").exists()],
  AuthMiddleware,
  CreateTodo
);

apiProtected.put(
  "/marktodo",
  [check("todo_id", "Todo Id is required").exists()],
  AuthMiddleware,
  MarkTodo
);

apiProtected.get(
  "/todolist",
  AuthMiddleware,
  GetTodos
);

apiProtected.post(
  "/deletetodo",
  [check("todo_id", "Todo Id is required").exists()],
  AuthMiddleware,
  RemoveTodo
);

module.exports = apiProtected;
