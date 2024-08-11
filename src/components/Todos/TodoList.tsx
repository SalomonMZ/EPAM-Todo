import { useEffect, useState } from "react";
import { data } from "../../fixture/data";
import Todo from "./Todo";
import type { ITodo } from "./Todo";
import Loader from "../Loader";

type IData = Omit<ITodo, "dueDate"> & { dueDate: string | null };

const randomTime = Math.floor(Math.random() * (2000 - 500 + 1)) + 500;

const retrieveDataAsync = (): Promise<IData[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(data), randomTime);
  });
};

const sortByDueDateAndCompletion = (todos: ITodo[]) => {
  const currentDate = new Date().getTime();

  return todos.sort((a, b) => {
    const dateA = a.dueDate ? new Date(a.dueDate).getTime() : null;
    const dateB = b.dueDate ? new Date(b.dueDate).getTime() : null;

    if (a.isComplete && !b.isComplete) return 1;
    if (!a.isComplete && b.isComplete) return -1;

    if (dateA === null && dateB !== null) return 1;
    if (dateB === null && dateA !== null) return -1;

    if (dateA !== null && dateB !== null) return dateA - dateB;

    if (dateA! < currentDate && dateB! >= currentDate) return -1;
    if (dateB! < currentDate && dateA! >= currentDate) return 1;

    return 0;
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
