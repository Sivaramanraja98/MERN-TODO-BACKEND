// Import required modules
const mongoose = require("mongoose");

// Create a Mongoose schema
const todoSchema = mongoose.Schema({
 userId:{
    type : mongoose.Schema.Types.ObjectId,
    ref :"User",
    required: true, 
 },
 desc :{
    type : String ,
    required :true,
 },
 isCompleted :{
    type :Boolean,
    default:false,
    required : true,
 },
 date : {
    type : Date,
    default: Date.now,
 }
});

// Create the Todo model
const Todo = mongoose.model("Todo", todoSchema);

// Export the Todo model
module.exports = Todo;
