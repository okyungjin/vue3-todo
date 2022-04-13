import axios from 'axios';

const baseUrl = 'http://localhost:3000';

const getTodoList = () => axios.get(`${baseUrl}/todos`);

const addTodoItem = (todo) => axios.post(`${baseUrl}/todos`, todo);

const deleteTodoItem = (todoId) => axios.delete(`${baseUrl}/todos/${todoId}`);

export {
  getTodoList,
  addTodoItem,
  deleteTodoItem,
};
