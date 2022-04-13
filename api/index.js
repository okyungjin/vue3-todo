import axios from 'axios';

const baseUrl = 'http://localhost:3000';

const getTodos = () => axios.get(`${baseUrl}/todos`);

const postTodo = (todo) => axios.post(`${baseUrl}/todos`, todo);

export {
  getTodos,
  postTodo,
};
