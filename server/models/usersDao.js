const usersModel = require("./users");

const findAllUsers = () => usersModel.find();
const findUserById = (id) => usersModel.findById(id);
const findUserByUsername = (username) => usersModel.findOne({ username });
const findUserByCredentials = (username, password) => usersModel.findOne({ username: username, password: password });
const createUser = (user) => usersModel.create(user);
const updateUser = (id, user) => usersModel.updateOne({ _id: id }, { $set: user });
const deleteUser = (id) => usersModel.deleteOne({ _id: id });

module.exports = {
	findAllUsers,
	findUserById,
	findUserByUsername,
	findUserByCredentials,
	createUser,
	updateUser,
	deleteUser
}