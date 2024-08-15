import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import TodoList from "../TodoList";

jest.mock("../../../fixture/data", () => ({
  data: [
    { id: 1, description: "Task 1", dueDate: "2024-08-10", isComplete: false },
    { id: 2, description: "Task 2", dueDate: "2024-08-05", isComplete: true },
    { id: 3, description: "Task 3", dueDate: null, isComplete: false },
  ],
}));

jest.mock("../../Loader", () => jest.fn(() => <div>Loading...</div>));

describe("TodoList", () => {
  it("should display the Loader while fetching data", () => {
    render(<TodoList />);

    // Check if the Loader component is rendered initially
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("should render todos after fetching data", async () => {
    render(<TodoList />);

    await waitFor(
      () => {
        expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
      },
      { timeout: 2000 }
    );

    await waitFor(
      () => {
        expect(screen.getAllByText(/Task/i)).toHaveLength(3);
      },
      { timeout: 2000 }
    );
  });

    it('should toggle the completion status when a todo is clicked', async () => {
      render(<TodoList />);

      await waitFor(() => {
        expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
      }, {timeout: 2000});

      const firstTodo = screen.getAllByText(/Task/i)[0];

      const checkbox = firstTodo.closest('li')?.querySelector('input[type="checkbox"]');
      if (!checkbox) {
        throw new Error('Checkbox not found');
      }
    
      expect(checkbox).not.toBeChecked();
    
      fireEvent.click(checkbox);
    
      expect(checkbox).toBeChecked();

    });
});
