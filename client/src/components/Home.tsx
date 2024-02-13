import React, { FormEvent, useEffect } from "react";
import styles from "../styles/Home.module.scss";
import {
  useAddTodoMutation,
  useDeleteTodoMutation,
  useGetTodosQuery,
  useUpdateTodoMutation,
} from "../store/todoApi";

const Home = () => {
  const addTodoForm = React.createRef<HTMLFormElement>();

  const { data: todos, isLoading } = useGetTodosQuery();
  const [addTodo] = useAddTodoMutation();
  const [updateTodo] = useUpdateTodoMutation();
  const [deletedTodo] = useDeleteTodoMutation();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    console.log(e.target[0].value);
    try {
      const data = await addTodo({
        title: e.target[0].value,
        description: e.target[1].value,
      });
      if (data) {
        e.target.reset();
        alert("New todo added.");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const markAsCompleted = async (id: string) => {
    try {
      const res = await updateTodo(id);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {}, [todos]);
  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <div className={styles.header}>My Todos</div>
        <form
          className={styles.addTodo}
          ref={addTodoForm}
          onSubmit={handleSubmit}
        >
          <div className={styles.form_element}>
            <label htmlFor="title">Title</label>
            <input type="text" name="title" id="title" />
          </div>
          <div className={styles.form_element}>
            <label htmlFor="desc">Description</label>
            <input type="text" name="desc" id="desc" />
          </div>
          <button type="submit">Add todo</button>
        </form>
        <div className={styles.todos}>
          {!isLoading &&
            todos?.map((todo, i) => (
              <div className={styles.todo} key={todo._id}>
                <div className={styles.info}>
                  <span className={styles.title}>{todo.title}</span>
                  <br />
                  <span className={styles.desc}>{todo.description}</span>
                </div>
                <div className={styles.actions}>
                  {todo.status == 0 && (
                    <button
                      onClick={() => markAsCompleted(todo._id!)}
                      className={styles.complete_todo}
                    >
                      Mark as completed
                    </button>
                  )}
                  <button
                    onClick={() => deletedTodo(todo._id!)}
                    className={styles.delete_todo}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
