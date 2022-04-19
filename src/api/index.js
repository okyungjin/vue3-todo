import axios from '../axios';

const getTodoItem = (todoId) => axios.get(`/todos/${todoId}`);

const getTodoList = (page, limit, searchText) => {
  let uri = '/todos';
  if (page) uri += `?_page=${page}&_limit=${limit}&title_like=${searchText}&_sort=id&_order=desc`;
  return axios.get(uri);
};

const addTodoItem = (todo) => axios.post('/todos', todo);

const deleteTodoItem = (todoId) => axios.delete(`/todos/${todoId}`);

const patchTodoItem = (todoId, value) => axios.patch(`/todos/${todoId}`, value);

const putTodoItem = (todoId, value) => axios.put(`/todos/${todoId}`, value);

export {
  getTodoItem,
  getTodoList,
  addTodoItem,
  deleteTodoItem,
  patchTodoItem,
  putTodoItem,
};
