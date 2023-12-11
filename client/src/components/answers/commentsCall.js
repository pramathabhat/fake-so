import axios from "axios"

const SERVER_API_URL = `http://localhost:8000/api`;

const request = axios.create({baseURL:SERVER_API_URL, withCredentials: true});

export const getComments = async () => {
	const response = await request.get(`/comments`);
	return response.data;
}

export const createNewComment = async (comment) => {
	const response = await request.post(`/comments`, comment);
	return response.data;
}

export const findOneComment = async (name) => {
	const response = await request.get(`/comments/${name}`);
	return response.data
}

export const updateComment = async (comment) => {
	console.log(comment);
	const response = await request.put(`/comments/${comment._id}`, comment);
	return response.data;
}

export const deleteComment = async (comment) => {
	const response = await request.delete(`/comments/${comment._id}`);
	return response.status;
}