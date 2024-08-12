import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest"; // Ensure correct imports
import Todo from "./Todo";
import { TodoProps } from "../../types/todo"; // Adjust the import path as needed

// Mock functions for the props
const mockOnTodoStatusChange = vi.fn();
const mockOnEditClick = vi.fn();
const mockOnDeleteClick = vi.fn();

// Define a mock todo item
const mockTodo: TodoProps = {
  todo: {
    id: "1",
    title: "Test Todo",
    completed: false,
  },
  onTodoStatusChange: mockOnTodoStatusChange,
  onEditClick: mockOnEditClick,
  onDeleteClick: mockOnDeleteClick,
};


describe('Todo Component', () => {
  it('renders Todo component correctly', () => {
    render(<Todo {...mockTodo} />);

    // Check if the title is rendered
    expect(screen.getByText('Test Todo')).toBeInTheDocument();

    // Check if the switch is correctly rendered
    expect(screen.getByRole('switch')).toBeInTheDocument();

    // Check for the Edit button
    expect(screen.getByRole('button', { name: /Edit/i })).toBeInTheDocument();

    // Check for the Delete button
    expect(screen.getByRole('button', { name: /Delete/i })).toBeInTheDocument();
  });

  it('calls onTodoStatusChange when the switch is toggled', () => {
    render(<Todo {...mockTodo} />);

    // Find the switch and simulate a change
    const switchElement = screen.getByRole('switch');
    fireEvent.click(switchElement);

    // Verify the onTodoStatusChange function is called with the correct arguments
    expect(mockOnTodoStatusChange).toHaveBeenCalledWith(true, '1');
  });

  it('calls onEditClick when the Edit button is clicked', () => {
    render(<Todo {...mockTodo} />);

    // Find the Edit button and simulate a click
    const editButton = screen.getByRole('button', { name: /Edit/i });
    fireEvent.click(editButton);

    // Verify the onEditClick function is called with the correct arguments
    expect(mockOnEditClick).toHaveBeenCalledWith(mockTodo.todo);
  });

  it('calls onDeleteClick when the Delete button is clicked and confirm deletion', async () => {
    render(<Todo {...mockTodo} />);

    // Find the Delete button and simulate a click
    const deleteButton = screen.getByRole('button', { name: /Delete/i });
    fireEvent.click(deleteButton);

    // Confirm the deletion action
    // Since we use Popconfirm, we'll need to confirm the action
    const confirmButton = screen.getByRole('button', { name: /Yes/i });
    fireEvent.click(confirmButton);

    // Verify the onDeleteClick function is called with the correct arguments
    expect(mockOnDeleteClick).toHaveBeenCalledWith('1');
  });
});
