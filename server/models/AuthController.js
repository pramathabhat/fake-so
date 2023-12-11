const usersDao = require("./usersDao")
const bcrypt = require("bcryptjs");

const AuthController = (app) => {
	const register = async (req, res) => {
		const user = await usersDao.findUserByUsername(req.body.username);
		if (user) {
			res.sendStatus(403);
			return;
		}
		let password = req.body.password;
		const saltRounds = 10;
		const salt = bcrypt.genSaltSync(saltRounds);
		const hashedPassword = bcrypt.hashSync(password, salt);

		const newUser = await usersDao.createUser({...req.body, password: hashedPassword, createDate: new Date()});
		res.json(newUser);
	};


	const login = async (req, res) => {

		const username = req.body.username;
		const password = req.body.password;
		if (username && password) {
			const userCheck = await usersDao.findUserByUsername(username);
			if (userCheck) {
				let hashedPassword = userCheck.password;
				const isPasswordValid = bcrypt.compareSync(password, hashedPassword);
				if (isPasswordValid) {
					const user = await usersDao.findUserByCredentials(username, hashedPassword);
					if (user) {
						res.cookie('currentUser', user, { httpOnly: true });
						req.session["currentUser"] = user;
						res.json(user);
					} else {
						res.sendStatus(403);
					}
				} else {
					res.sendStatus(403);
				}
			} else {
				res.sendStatus(403);
			}
		} else {
			res.sendStatus(403);
		}
	};

	const profile = (req, res) => {
		const currentUser = req.session["currentUser"];
		if (!currentUser) {
			res.sendStatus(404);
			return;
		}
		res.json(currentUser);
	};

	const logout = async (req, res) => {
		res.clearCookie("currentUser")
		req.session.destroy();
		res.sendStatus(200);
	};

	const update = async (req, res) => {
		const id = req.params.uid;
		const user = await usersDao.updateUser(id, req.body);
		res.cookie('currentUser', user, { httpOnly: true });
		req.session["currentUser"] = user;
		res.json(user);
	};

	const checkAuth = async (req, res) => {
		if (req.cookies && req.cookies.currentUser) {
			console.log(req.cookies.currentUser);
			const currentUser = req.cookies.currentUser;
			req.session["currentUser"] = currentUser;
			res.json(currentUser);
		} else {
			res.sendStatus(404);
		}
	};

	app.post("/api/users/register", register);
	app.post("/api/users/login",    login);
	app.post("/api/users/profile",  profile);
	app.post("/api/users/logout",   logout);
	app.put ("/api/users",          update);
	app.get("/api/users/checkAuth",       checkAuth);
};

module.exports = {AuthController};