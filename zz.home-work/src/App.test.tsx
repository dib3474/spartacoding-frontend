import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';
import { vi } from 'vitest';

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

  it('할 일을 입력할 때 100자 이상 작성하면 입력할 수 없다.', () => {
    //given
    const maxText = "m".repeat(100);
    render(<App />);
    const todoInput = screen.getByLabelText('New Todo');
    const dateInput = screen.getByLabelText('Deadline');
    //when
    fireEvent.change(todoInput, { target: {value: maxText}});
    fireEvent.change(dateInput, { target: {value: '2025-06-02'}});
    //then
    const addButton = screen.getByRole('button', { name: 'Add Todo'});
    expect(addButton).toBeDisabled();
  });

  it('할 일을 입력할 때 데드라인 날짜가 오늘 날짜 미만이면 입력할 수 없다.', () => {
    //given
    const date = new Date(2025, 5, 31);

    vi.useFakeTimers();
    vi.setSystemTime(date);

    const deadline = new Date(2025, 1, 1)

    render(<App />);
    const todoInput = screen.getByLabelText('New Todo');
    const dateInput = screen.getByLabelText('Deadline');
    //when
    fireEvent.change(todoInput, { target: {value: 'abc'}});
    fireEvent.change(dateInput, { target: {value: deadline.toISOString().split('T')[0]}});
    //then
    const addButton = screen.getByRole('button', { name: 'Add Todo'});
    expect(addButton).toBeDisabled();
  });
});
