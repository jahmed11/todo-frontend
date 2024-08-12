
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ListHeader from './ListHeader';

describe('ListHeader Component', () => {
  it('renders the ListHeader component correctly', () => {
    render(<ListHeader onAddClick={vi.fn()} />);

    // Check if the "Todo List" heading is present
    expect(screen.getByText('Todo List')).toBeInTheDocument();

    // Check if the "Add" button is present
    expect(screen.getByRole('button', { name: /Add/i })).toBeInTheDocument();
  });

  it('calls onAddClick when the Add button is clicked', () => {
    const onAddClickMock = vi.fn();
    render(<ListHeader onAddClick={onAddClickMock} />);

    // Click the "Add" button
    fireEvent.click(screen.getByRole('button', { name: /Add/i }));

    // Check if onAddClick was called
    expect(onAddClickMock).toHaveBeenCalledTimes(1);
  });
});