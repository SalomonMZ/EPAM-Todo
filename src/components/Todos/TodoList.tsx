import { useEffect, useState } from "react";
import { data } from "../../fixture/data";
import Todo from "./Todo";
import type { ITodo } from "./Todo";
import Loader from "../Loader";
import { sortByDueDateAndCompletion } from "./utils/sortByDateAndComplete";

type IData = Omit<ITodo, "dueDate"> & { dueDate: string | null };

const randomTime = Math.floor(Math.random() * (2000 - 500 + 1)) + 500;

const retrieveDataAsync = (): Promise<IData[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(data), randomTime);
  });
};


function TodoList() {
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    retrieveDataAsync().then((fetchedTodos) => {
      const normalizeFetchedTodos = fetchedTodos.map((todo) => ({
        ...todo,
        dueDate: todo.dueDate ? todo.dueDate : "",
      }));
      setTodos(normalizeFetchedTodos);
      setIsLoading(false);
    });
  }, []);

  const handleOnChange = (id: number) => {
    // This should update the mock api with the id
    const modifiedTodo = todos.find((todo) => todo.id === id);
    if (modifiedTodo) {
      modifiedTodo.isComplete = !modifiedTodo?.isComplete;
      setTodos([...todos]);
    }
  };

  const sortedTodos = sortByDueDateAndCompletion(todos);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <ul className="w-1/3">
        {sortedTodos.map((todo) => (
          <Todo key={todo.id} todo={todo} handleOnChange={handleOnChange} />
        ))}
      </ul>
    </>
  );
}

export default TodoList;
