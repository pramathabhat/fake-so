import axios from "axios";

const SERVER_API_URL = `http://localhost:8000/api`;

const request = axios.create({baseURL:SERVER_API_URL, withCredentials: true});

export const getAllQuestions = async () => {
  const response = await request.get(`/questions`);
  return response.data;
};

export const createNewQuestion = async (question) => {
  const response = await request.post(`/ask`, question);
  return response.data;
};

export const updateQuestion = async (question) => {
  // const data = { views: question.views, answers: question.answers };
  const response = await request.put(`/questions/${question._id}`, question);
  return response.data;
};

export const findQuestionById = async (questionId) => {
  const response = await request.get(`/questions/${questionId}`)
  return response.data;
};

export const deleteQuestion = async (questionId) => {
  const response = await request.delete(`/questions/${questionId}`);
  return response.status;
};
