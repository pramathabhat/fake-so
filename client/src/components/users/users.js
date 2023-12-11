import axios from "axios";

const SERVER_API_URL = `http://localhost:8000/api`;

const api = axios.create({baseURL:SERVER_API_URL, withCredentials: true});

export const findUser = async (userID) => {
	const response = await api.get(`/users/${userID}`);
	return response.data;
};

export const findAllUsers = async () => {
	const response = await api.get(`/users`);
	return response.data;
}

export const updateUser = async (user) => {
	const response = await api.put(`/users/${user._id}`, user);
	return response.data;
}