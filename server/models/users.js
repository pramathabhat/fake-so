let mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  questions: [{ type: mongoose.Schema.Types.ObjectId, default: [], ref: "questions" }],
  answers: [{ type: mongoose.Schema.Types.ObjectId, default: [], ref: "answers" }],
  tags: [{ type: mongoose.Schema.Types.ObjectId, default: [], ref: "tags" }],
  comments: [{ type: mongoose.Schema.Types.ObjectId, default: [], ref: "comments" }],
  upvotedQuestions: [{ type: mongoose.Schema.Types.ObjectId, default: [], ref: "questions" }],
  downvotedQuestions: [{ type: mongoose.Schema.Types.ObjectId, default: [], ref: "questions" }],
  upvotedAnswers: [{ type: mongoose.Schema.Types.ObjectId, default: [], ref: "answers" }],
  downvotedAnswers: [{ type: mongoose.Schema.Types.ObjectId, default: [], ref: "answers" }],
  upvotedComments: [{ type: mongoose.Schema.Types.ObjectId, default: [], ref: "comments" }],
  points: { type: Number, default: 0 },
  createDate: { type: Date, required: true },
});

const usersModel = mongoose.model("users", userSchema);

module.exports = usersModel;
