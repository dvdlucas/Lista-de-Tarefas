const mongoose = require("mongoose");

const TarefasSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  createAt: {
    type: Date,
    default: Date.now(),
  },
  completed: {
    type: Boolean,
    required: true,
  },
});

const Tarefas = mongoose.model("Tarefas", TarefasSchema);
module.exports = Tarefas;
