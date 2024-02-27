const User = require("../models/User");
const { StatusCode } = require("../utils/constant");
const jsonGenerate = require("../utils/helpers");

const GetTodos = async (req, res) => {
  try {
    const list = await User.findById(req.userId)
      .select("-password")
      .populate("todos")
      .exec();

    return res.json(jsonGenerate(StatusCode.SUCCESS, "All todo List", list));
  
} catch (error) {
    return res.json(
      jsonGenerate(StatusCode.UNPROCESSABLE_ENTITY, "Error", error)
    );
  }
};


module.exports = GetTodos;