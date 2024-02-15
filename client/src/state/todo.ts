import { createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../api-client";
import { Todo } from "../entities/Todo";
import { AppDispatch } from "./store";

const initialState: { list: Todo[]; isLoading: boolean } = {
  list: [],
  isLoading: false,
};

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    todosRequested: (todos) => {
      todos.isLoading = true;
    },
    todosReceived: (todos, action) => {
      todos.list = action.payload;
      todos.isLoading = false;
    },
    todosRequestFailed: (todos) => {
      todos.isLoading = false;
    },
    todoAdded: (todos, action) => {
      todos.list = [...todos.list, action.payload];
    },
    todoCompleted: (todos, action) => {
      const todoId = todos.list.findIndex(
        (todo) => todo._id === action.payload.id
      );
      todos.list[todoId].status = 1;
    },
    todoDeleted: (todos, action) => {
      todos.list = todos.list.filter((todo) => todo._id != action.payload.id);
    },
  },
});
export const todoReducer = todoSlice.reducer;
export const {
  todosRequested,
  todosReceived,
  todosRequestFailed,
  todoAdded,
  todoCompleted,
  todoDeleted,
} = todoSlice.actions;

export const loadTodos = () => async (dispatch: AppDispatch) => {
  try {
    dispatch({ type: todosRequested.type });
    const res = await axiosInstance.get("/");
    dispatch({ type: todosReceived.type, payload: res.data });
  } catch (error) {
    dispatch({ type: todosRequestFailed.type });
  }
};

export const addTodo = (todo: Todo) => async (dispatch: AppDispatch) => {
  try {
    const res = await axiosInstance.post("/", todo);
    dispatch({ type: todoAdded.type, payload: res.data.todo });
  } catch (error) {
    console.log(error);
  }
};
export const updateTodo = (id: string) => async (dispatch: AppDispatch) => {
  try {
    await axiosInstance.patch(`/${id}`, { status: 1 });
    dispatch({ type: todoCompleted.type, payload: { id } });
  } catch (error) {
    console.log(error);
  }
};

export const deleteTodo = (id: string) => async (dispatch: AppDispatch) => {
  try {
    await axiosInstance.delete(`/${id}`);
    dispatch({ type: todoDeleted.type, payload: { id } });
  } catch (error) {
    console.log(error);
  }
};
