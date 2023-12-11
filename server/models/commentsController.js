let commentsModel = require("./comments");

const createComment = (comment) => commentsModel.create(comment);

const findComments = () => commentsModel.find();

const findComment = (name) => commentsModel.findOne({ name: name });

const updateComment = (cid, comment) => commentsModel.updateOne({ _id: cid }, { $set: comment });

const deleteComment = (commentId) => commentsModel.deleteOne({ _id: commentId });

const findAllComments = async (req, res) => {
  const comments = await findComments();
  res.json(comments);
};

const findOneComment = async (req, res) => {
  const name = req.params.name;
  const comment = await findComment(name);
  res.json(comment);
};

const createNewComment = async (req, res) => {
  console.log(req);
  const newComment = await createComment(req.body);
  res.json(newComment);
};

const updateOneComment = async (req, res) => {
  const cid = req.params.cid;
  const comment = req.body;
  const updatedComment = await updateComment(cid, comment);
  res.json(updatedComment);
};

const removeComment = async (req, res) => {
  const cid = req.params.cid;
  const status = await deleteComment(cid);
  res.json(status);
};

const CommentsController = (app) => {
  app.get("/api/comments", findAllComments);
  app.get("/api/comments/:name", findOneComment);
  app.post("/api/comments", createNewComment);
  app.put("/api/comments/:cid", updateOneComment);
  app.delete("/api/comments/:cid", removeComment);
};

module.exports = CommentsController;
