import { useEffect } from "react";
import { Todo } from "../entities/Todo";
import { useAppDispatch, useAppSelector } from "../state/hooks";
import { RootState } from "../state/store";
import { addTodo, deleteTodo, loadTodos, updateTodo } from "../state/todo";
import styles from "../styles/Home.module.scss";

const Home = () => {
  // const { data, isLoading } = useGetTodosQuery();
  // const [addTodo] = useAddTodoMutation();
  // const [updateTodo] = useUpdateTodoMutation();
  // const [deletedTodo] = useDeleteTodoMutation();

  const dispatch = useAppDispatch();

  const { list: todos, isLoading } = useAppSelector(
    (state: RootState) => state.todos
  );

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    console.log(e.target[0].value);
    dispatch(
      addTodo({
        title: e.target[0].value,
        description: e.target[1].value,
      })
    );
    e.target.reset();
  };

  useEffect(() => {
    dispatch(loadTodos());
  }, []);
  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <div className={styles.header}>My Todos</div>
        <form className={styles.addTodo} onSubmit={handleSubmit}>
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
            todos?.length! > 0 &&
            todos?.map((todo: Todo) => (
              <div className={styles.todo} key={todo._id}>
                <div
                  className={[
                    styles.info,
                    todo.status ? styles.completed : "",
                  ].join(" ")}
                >
                  <span className={styles.title}>
                    {todo.status ? <del>{todo.title}</del> : todo.title}
                  </span>
                  <br />
                  <span className={styles.desc}>
                    {todo.status ? (
                      <del>{todo.description}</del>
                    ) : (
                      todo.description
                    )}
                  </span>
                </div>
                <div className={styles.actions}>
                  {todo.status == 0 && (
                    <button
                      onClick={() => dispatch(updateTodo(todo._id!))}
                      className={styles.complete_todo}
                    >
                      Mark as completed
                    </button>
                  )}
                  <button
                    onClick={() => dispatch(deleteTodo(todo._id!))}
                    className={styles.delete_todo}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          {!isLoading && !todos?.length && (
            <h3>
              <center>No todo found.</center>
            </h3>
          )}
          {isLoading && (
            <h3>
              <center>Loading todos...</center>
            </h3>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
