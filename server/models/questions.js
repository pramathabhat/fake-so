// Question Document Schema
let mongoose = require("mongoose");

const questionsSchema = new mongoose.Schema({
  title: { type: String, required: true, maxLength: 100 },
  text: { type: String, required: true },
  tags: [{ type: mongoose.Schema.Types.ObjectId, maxLength: 5, ref: "tags" }],
  asked_by: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
  ask_date_time: { type: Date },
  active_date: { type: Date },
  answers: [{ type: mongoose.Schema.Types.ObjectId, default: [], ref: "answers" }],
  views: { type: Number, default: 0 },
  votes: { type: Number, default: 0 },
  comments: [{ type: mongoose.Schema.Types.ObjectId, default: [], ref: "comments" }],
  accepted_answer: { type: mongoose.Schema.Types.ObjectId, ref: "answers" },
});

const questionsModel = mongoose.model("questions", questionsSchema);

module.exports = questionsModel;
