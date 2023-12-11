const answersModel = require("./answers");

const getAnswers = () => answersModel.find();

const addAnswer = (answer) => answersModel.create(answer);

const getAllAnswers = async (req, res) => {
	const answers = await getAnswers();
	res.json(answers)
}

const createAnswer = async (req,res) => {
	const newAnswer = await addAnswer(req.body);
	res.json(newAnswer);
}

const updateAnswer = async (req, res) => {
	const answer = await answersModel.updateOne(
		{_id: req.params.aid},
		{ $set: req.body}
	);
	res.json(answer);
}

const deleteAnswer = async (req, res) => {
	const id = req.params.aid;
	let status = await answersModel.deleteOne({_id: id});
	res.json(status);
}

const getOneAnswer = async (req,res) => {
	const id = req.params.aid;
	let answer = await answersModel.findOne({_id: id});
	res.json(answer);
}

const AnswersController = (app) => {
	app.get("/api/answers", getAllAnswers);
	app.post("/api/answers", createAnswer);
	app.put("/api/answers/:aid", updateAnswer);
	app.delete("/api/answers/:aid", deleteAnswer)
	app.get("/api/answers/:aid", getOneAnswer)
}

module.exports = AnswersController;