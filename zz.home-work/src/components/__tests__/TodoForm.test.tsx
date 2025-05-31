import { fireEvent, render, screen } from '@testing-library/react';
import { TodoForm } from '../todo-form';
import { vi } from 'vitest';

describe('TodoForm 입력 단위 테스트', () => {
  // 성공 case
  it('할일, 데드라인을 입력 받으면 버튼이 활성화 된다.', () => {
    render(<TodoForm todos={[]} setTodos={vi.fn()}/>);
    const todoInput = screen.getByLabelText('New Todo');
    const dateInput = screen.getByLabelText('Deadline');
    const button = screen.getByRole('button', { name: 'Add Todo'});

    fireEvent.change(todoInput, { target: {value: '과제 끝내기'}});
    fireEvent.change(dateInput, { target: {value: '2025-06-02'}});

    expect(button).not.toBeDisabled();
  });

  // 실패 case
  it('할일이 없으면 버튼이 비활성화된다.', () => {
    render(<TodoForm todos={[]} setTodos={vi.fn()}/>);
    const todoInput = screen.getByLabelText('New Todo');
    const dateInput = screen.getByLabelText('Deadline');
    const button = screen.getByRole('button', { name: 'Add Todo'});

    fireEvent.change(todoInput, { target: {value: null}});
    fireEvent.change(dateInput, { target: {value: '2025-06-02'}});

    expect(button).toBeDisabled();
  });
  it('데드라인이 없으면 버튼이 비활성화된다.', () => {
    render(<TodoForm todos={[]} setTodos={vi.fn()}/>);
    const todoInput = screen.getByLabelText('New Todo');
    const dateInput = screen.getByLabelText('Deadline');
    const button = screen.getByRole('button', { name: 'Add Todo'});

    fireEvent.change(todoInput, { target: {value: '과제 끝내기'}});
    fireEvent.change(dateInput, { target: {value: null}});

    expect(button).toBeDisabled();
  });
});