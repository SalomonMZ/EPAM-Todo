import { ITodo } from "../Todo";

export const sortByDueDateAndCompletion = (todos: ITodo[]) => {
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