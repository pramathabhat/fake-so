import axios from "axios"

const SERVER_API_URL = `http://localhost:8000/api`;

const request = axios.create({baseURL:SERVER_API_URL, withCredentials: true});

export const getTags = async () => {
	const response = await request.get(`/tags`);
	return response.data;
}

export const createNewTag = async (tag) => {
	const response = await request.post(`/tags`, tag);
	return response.data;
}

export const findOneTag = async (name) => {
	const response = await request.get(`/tags/${name}`);
	return response.data
}

export const updateTag = async (tag) => {
	console.log(tag);
	const response = await request.put(`/tags/${tag._id}`, tag);
	return response.data;
}

export const deleteTag = async (tag) => {
	const response = await request.delete(`/tags/${tag._id}`);
	return response.status;
}