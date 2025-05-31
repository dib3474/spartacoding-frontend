import { fireEvent, render, screen } from '@testing-library/react';
import { Todo } from '../../types/todo';
import { TodoList } from '../todo-list';
import { useState } from 'react';

const TodoListWrapper = ({ newTodos }: {newTodos: Todo[]})=> {
  const [todos, setTodos] = useState<Todo[]>(newTodos);
  return <TodoList todos={todos} setTodos={setTodos} />;
}

const todos: Todo[] = [{
    id: 1,
    text: '과제 끝내기',
    completed: false,
    deadline: '2025-06-02'
}];

describe('TodoList 단위 테스트', () => {
  it('체크박스 클릭하면 해야할 일 텍스트에 취소선이 그어진다.', () => {
    render(<TodoListWrapper newTodos={todos}/>);

    const checkbox = screen.getByRole('checkbox');
    const todoText = screen.getByText('과제 끝내기');
    fireEvent.click(checkbox);
    
    expect(todoText.parentElement).toHaveStyle('text-decoration: line-through');
  });
  it('완료된 할 일의 체크박스를 클릭하면 해야할 일 텍스트에 취소선이 사라진다.', () => {
    render(<TodoListWrapper newTodos={[{...todos[0], completed: true}]}/>);

    const checkbox = screen.getByRole('checkbox');
    const todoText = screen.getByText('과제 끝내기');
    fireEvent.click(checkbox);
    
    expect(todoText.parentElement).not.toHaveStyle('text-decoration: line-through');
  });
  it('삭제 버튼을 누르면 삭제된다.', () => {
    render(<TodoListWrapper newTodos={todos}/>);

    const todoText = screen.getByText('과제 끝내기');
    expect(todoText).toBeInTheDocument();

    const deleteBtn = screen.getByRole('button', { name: 'delete'});
    fireEvent.click(deleteBtn);
    
    expect(todoText).not.toBeInTheDocument();
  });
});

