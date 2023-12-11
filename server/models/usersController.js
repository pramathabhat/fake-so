const usersDao = require("./usersDao")

const findUsers = async (req, res) => {
	const username = req.body.username;
	const password = req.body.password;
	if (username && password) {
		const user = await usersDao.findUserByCredentials(username, password);
		if (user) {
			res.json(user);
		} else {
			res.sendStatus(404);
		}
	} else if (username) {
		const user = await usersDao.findUserByUsername(username);
		if (user) {
			res.json(user);
		} else {
			res.sendStatus(404);
		}
	} else {
		const users = await usersDao.findAllUsers();
		res.json(users);
	}
};

const findUser = async (req, res) => {
	const id = req.params.uid;
	const user = await usersDao.findUserById(id);
	res.json(user);
};

const removeUser = async (req, res) => {
	const id = req.params.id;
	const status = await usersDao.deleteUser(id);
	res.json(status);
};

const modifyUser = async (req, res) => {
	const id = req.params.uid;
	const status = await usersDao.updateUser(id, req.body);
	const user = await usersDao.findUserById(id);
	res.cookie('currentUser', user, { httpOnly: true });
	req.session["currentUser"] = user;
	res.json(status);
};

const UsersController = (app) => {
	app.get('/api/users', findUsers);
	app.get('/api/users/:uid', findUser);
	app.delete('/api/users/:uid', removeUser);
	app.put('/api/users/:uid', modifyUser);
}

module.exports = {UsersController};
