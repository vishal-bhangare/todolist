import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Todo } from "../entities/Todo";

export const todoApi = createApi({
  reducerPath: "todoApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://todolist-api-2hel.onrender.com/todos",
  }),
  tagTypes: ["Todo"],
  endpoints: (builder) => ({
    getTodos: builder.query<Todo[], void>({
      query: () => "/",
      providesTags: ["Todo"],
    }),
    addTodo: builder.mutation<{ message: string; data?: Todo }, Partial<Todo>>({
      query: (todo) => ({
        url: "/",
        method: "POST",
        body: todo,
      }),
      invalidatesTags: ["Todo"],
    }),
    updateTodo: builder.mutation<{ message: string; data?: Todo }, string>({
      query: (id) => ({
        url: `/${id}`,
        method: "PATCH",
        body: { status: 1 },
      }),
      invalidatesTags: ["Todo"],
    }),
    deleteTodo: builder.mutation<{ message: string }, string>({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Todo"],
    }),
  }),
});

export const {
  useGetTodosQuery,
  useAddTodoMutation,
  useUpdateTodoMutation,
  useDeleteTodoMutation,
} = todoApi;
