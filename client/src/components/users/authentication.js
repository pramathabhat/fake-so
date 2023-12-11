import axios from "axios";

const SERVER_API_URL = `http://localhost:8000/api`;
const USERS_URL = `${SERVER_API_URL}/users`;

const api = axios.create({baseURL:USERS_URL, withCredentials: true});

export const login = async ({ username, password }) => {
	const response = await api.post(`/login`, { username, password });
	return response.data;
};

export const logout = async () => {
	const response = await api.post(`/logout`);
	return response.data;
};

export const profile = async () => {
	return await api.post(`${USERS_URL}/profile`);
};

export const updateUser = async (user) => {
	const response = await api.put(`/${user._id}`, user);
	return response.data;
};

export const registerUser = async ({ username, email, password}) => {
	const response = await api.post(`/register`, {username, email, password});
	return response.data;
};

export const checkAuth = async () => {
	const response = await api.get(`/checkAuth`);
	return response.data;
};