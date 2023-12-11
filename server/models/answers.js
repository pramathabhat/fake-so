// Answer Document Schema
let mongoose = require("mongoose");

const answersSchema = new mongoose.Schema({
  text: { type: String, required: true },
  ans_by: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
  ans_date_time: { type: Date },
  active_date: { type: Date },
  votes: { type: Number, default: 0 },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "comments" }],
});

const answersModel = mongoose.model("answers", answersSchema);

module.exports = answersModel;
