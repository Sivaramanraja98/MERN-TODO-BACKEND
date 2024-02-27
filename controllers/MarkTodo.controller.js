const { validationResult } = require("express-validator");
const jsonGenerate = require("../utils/helpers");
const { StatusCode } = require("../utils/constant");
const Todo = require("../models/Todo");

const  MarkTodo = async (req, res) => {
    const error = validationResult(req);
  
    if (!error.isEmpty()) {
      return res.json(
        jsonGenerate(
          StatusCode.VALIDATION_ERROR,
          "todo id is requied",
          error.mapped()
        )
      );
    }
  
    try {
      const todo = await Todo.findOneAndUpdate(
        {
          _id: req.body.todo_id,
          userId: req.userId,
        },
        [
          {
            $set: {
              isCompleted: {
                $eq: [false, "$isCompleted"],
              },
            },
          },
        ]
      );
  
      if (todo) {
        return res.json(jsonGenerate(StatusCode.SUCCESS, "updated", todo));
      }
    } catch (error) {
      return res.json(
        jsonGenerate(StatusCode.UNPROCESSABLE_ENTITY, "could not update", null)
      );
    }
  };
module.exports = MarkTodo;

