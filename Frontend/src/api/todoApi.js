import axios from 'axios';

const instance = axios.create({
  // TODO: add host to each env file.
  baseURL: 'http://localhost:7000/api',
});

/**
 * Query all todo items.
 * @returns Promise<TodoItem array>
 */
const getTodoItems = async () => {
  const res = await instance.get('/todoItems');
  return res.data;
};

/**
 * Query single todo item by ID.
 * @param {*} id The todo item id
 * @returns Promise<TodoItem>
 */
const getTodoItemById = async (id) => {
  const res = await instance.get(`/todoItems/${id}`);
  return res.data;
};

/**
 * Create a new todo item.
 * @param {*} description The description of the todo.
 * @returns Promise<TodoItem>
 */
const createTodoItem = async (description) => {
  const res = await instance.post('/todoItems', { description });
  return res.data;
};

/**
 * Update todo item
 * @param {*} id the id of the todo item
 * @param {*} description new description
 * @param {*} isCompleted if completed
 * @returns Promise<TodoItem>
 */
const updateTodoItem = async ({ id, description, isCompleted }) => {
  const res = await instance.put(`/todoItems/${id}`, { description, isCompleted });
  return res.data;
};

export { getTodoItems, getTodoItemById, createTodoItem, updateTodoItem };
