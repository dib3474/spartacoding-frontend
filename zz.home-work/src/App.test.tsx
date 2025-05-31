import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';

describe('TodoList 통합 테스트', () => {
  it('Todo를 추가하고 완료 체크, 삭제한다', () => {
    render(<App />);
    // 추가
    const todoInput = screen.getByLabelText('New Todo');
    const dateInput = screen.getByLabelText('Deadline');
    const addButton = screen.getByRole('button', { name: 'Add Todo'});

    fireEvent.change(todoInput, { target: {value: '과제 끝내기'}});
    fireEvent.change(dateInput, { target: {value: '2025-06-02'}});
    fireEvent.click(addButton);

    const todoText = screen.getByText('과제 끝내기');
    expect(todoText).toBeInTheDocument();

    // 취소선
    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);
    expect(todoText.parentElement).toHaveStyle('text-decoration: line-through');

    // 삭제
    const deleteBtn = screen.getByRole('button', { name: 'delete'});
    fireEvent.click(deleteBtn);
    expect(todoText).not.toBeInTheDocument();
  });
});
