import axios from "axios";

const SERVER_API_URL = `http://localhost:8000/api`;

const request = axios.create({baseURL:SERVER_API_URL, withCredentials: true});

export const getAnswers = async () => {
  const response = await request.get(`/answers`);
  return response.data;
};

export const createNewAnswer = async (answer) => {
  const response = await request.post(`/answers`, answer);
  return response.data;
};

export const updateAnswer = async (answer) => {
  console.log(answer);
  const response = await request.put(`/answers/${answer._id}`, answer)
  console.log(response.data)
  return response.data;
}

export const deleteAnswer = async (answer) => {
  const response = await request.delete(`/answers/${answer._id}`);
  return response.status;
}
