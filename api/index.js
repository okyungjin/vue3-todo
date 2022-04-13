import axios from 'axios';

const baseUrl = 'http://localhost:3000';

const getTodoList = (page, limit, searchText) => {
  let uri = `${baseUrl}/todos`;
  if (page) uri += `?_page=${page}&_limit=${limit}&title_like=${searchText}`;
  return axios.get(uri);
};

const addTodoItem = (todo) => axios.post(`${baseUrl}/todos`, todo);

const deleteTodoItem = (todoId) => axios.delete(`${baseUrl}/todos/${todoId}`);

const patchTodoItem = (todoId, value) => axios.patch(`${baseUrl}/todos/${todoId}`, value);

export {
  getTodoList,
  addTodoItem,
  deleteTodoItem,
  patchTodoItem,
};
