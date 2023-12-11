const questionsModel = require("./questions");

const getQuestions = () => questionsModel.find();

const createQuestion = (question) => questionsModel.create(question);

const findAllQuestions = async (req, res) => {
  const questions = await getQuestions();
  res.json(questions);
};

const createNewQuestion = async (req, res) => {
  const newQuestion = await createQuestion(req.body);
  res.json(newQuestion);
};

const updateOneQuestion = async (req, res) => {
  const question = await questionsModel.updateOne({ _id: req.params.qid }, { $set: req.body });
  res.json(question);
};

const findQuestion = async (req, res) => {
  let id = req.params.uid;
  const question = await questionsModel.find({ _id: id });
  res.json(question);
};

const deleteQuestion = async (req, res) => {
  let id = req.params.qid;
  let status = await questionsModel.deleteOne({ _id: id });
  res.json(status);
};

const QuestionsController = (app) => {
  app.get("/api/questions", findAllQuestions);
  app.post("/api/ask", createNewQuestion);
  app.put("/api/questions/:qid", updateOneQuestion);
  app.get("/api/questions/:qid", findQuestion);
  app.delete("/api/questions/:qid", deleteQuestion);
};

module.exports = QuestionsController;
