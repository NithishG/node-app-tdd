var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var TodoSchema = new Schema({
  todo: {
    type: String
  },
  completed: {
    type: Boolean,
    default: false
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

//console.log(TodoSchema.path('todo') instanceof mongoose.SchemaType)
var TodoModel = mongoose.model("Todo", TodoSchema);
//console.log(new TodoModel({'todo':"jksbjkb"}))
module.exports = TodoModel;
