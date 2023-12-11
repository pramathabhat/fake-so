// Comments Document Schema
let mongoose = require("mongoose");

const commentsSchema = new mongoose.Schema({
  text: { type: String, required: true },
  votes: { type: Number, default: 0 },
  comment_date_time: { type: Date },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
});

const commentsModel = mongoose.model("comments", commentsSchema);

module.exports = commentsModel;
