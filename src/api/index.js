import axios from 'axios';

const baseUrl = 'http://localhost:3000';

const getTodoItem = (todoId) => axios.get(`${baseUrl}/todos/${todoId}`);

const getTodoList = (page, limit, searchText) => {
  let uri = `${baseUrl}/todos`;
  if (page) uri += `?_page=${page}&_limit=${limit}&title_like=${searchText}&_sort=id&_order=desc`;
  return axios.get(uri);
};

const addTodoItem = (todo) => axios.post(`${baseUrl}/todos`, todo);

const deleteTodoItem = (todoId) => axios.delete(`${baseUrl}/todos/${todoId}`);

const patchTodoItem = (todoId, value) => axios.patch(`${baseUrl}/todos/${todoId}`, value);

const putTodoItem = (todoId, value) => axios.put(`${baseUrl}/todos/${todoId}`, value);

export {
  getTodoItem,
  getTodoList,
  addTodoItem,
  deleteTodoItem,
  patchTodoItem,
  putTodoItem,
};
