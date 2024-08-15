import { ITodo } from '../Todo';
import { sortByDueDateAndCompletion } from '../utils/sortByDateAndComplete';

describe('sortByDueDateAndCompletion', () => {
  it('should sort completed todos to the bottom', () => {
    const todos: ITodo[] = [
      { id: 1, description: 'Incomplete Task', isComplete: false, dueDate: '2024-08-20' },
      { id: 2, description: 'Completed Task', isComplete: true, dueDate: '2024-08-15' }
    ];

    const sortedTodos = sortByDueDateAndCompletion(todos);

    expect(sortedTodos[0].isComplete).toBe(false);
    expect(sortedTodos[1].isComplete).toBe(true);
  });

  it('should sort todos by due date with due soonest at the top', () => {
    const todos: ITodo[] = [
      { id: 1, description: 'Task with later due date', isComplete: false, dueDate: '2024-08-20' },
      { id: 2, description: 'Task with sooner due date', isComplete: false, dueDate: '2024-08-15' }
    ];

    const sortedTodos = sortByDueDateAndCompletion(todos);

    expect(sortedTodos[0].dueDate).toBe('2024-08-15');
    expect(sortedTodos[1].dueDate).toBe('2024-08-20');
  });

  it('should place overdue todos at the top', () => {
    const currentDate = new Date().toISOString().split('T')[0]; 
    const pastDate = '2023-08-01'; 

    const todos: ITodo[] = [
      { id: 1, description: 'Future Task', isComplete: false, dueDate: currentDate },
      { id: 2, description: 'Overdue Task', isComplete: false, dueDate: pastDate }
    ];

    const sortedTodos = sortByDueDateAndCompletion(todos);

    expect(sortedTodos[0].dueDate).toBe(pastDate);
    expect(sortedTodos[1].dueDate).toBe(currentDate);
  });

  it('should keep the order of tasks if due dates are equal and completion statuses are the same', () => {
    const todos: ITodo[] = [
      { id: 1, description: 'Task 1', isComplete: false, dueDate: '2024-08-20' },
      { id: 2, description: 'Task 2', isComplete: false, dueDate: '2024-08-20' }
    ];

    const sortedTodos = sortByDueDateAndCompletion(todos);

    expect(sortedTodos[0].id).toBe(1);
    expect(sortedTodos[1].id).toBe(2);
  });
});
