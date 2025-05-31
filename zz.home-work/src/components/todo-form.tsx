import { TextField, Button } from '@mui/material';
import { Dispatch } from 'react';
import { Todo } from '../types/todo';
import { useTodoForm } from '../hooks/use-todo-form';

export const TodoForm = ({
  todos,
  setTodos,
}: {
  todos: Todo[];
  setTodos: Dispatch<React.SetStateAction<Todo[]>>;
}) => {
  const { initForm, updateDeadline, updateTodo, todo, deadline } =
    useTodoForm();

  const maxTextLength = 100;

  const handleAddTodo = () => {
    if (!(todo.trim() && deadline)) return;

    setTodos([
      ...todos,
      {
        id: Date.now(),
        text: todo.trim(),
        completed: false,
        deadline,
      },
    ]);
    initForm();
  };

  return (
    <>
      <TextField
        label="New Todo"
        variant="outlined"
        fullWidth
        value={todo}
        onChange={(e) => updateTodo(e.target.value)}
        style={{ marginBottom: '1rem' }}
      />
      <TextField
        label="Deadline"
        type="date"
        InputLabelProps={{ shrink: true }}
        fullWidth
        value={deadline}
        onChange={(e) => {
          const selectedDate = e.target.value;
          updateDeadline(selectedDate);
        }}
        style={{ marginBottom: '1rem' }}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleAddTodo}
        fullWidth
        disabled={!todo.trim() || todo.trim().length >= maxTextLength || !deadline || deadline < new Date().toISOString().split('T')[0]}
      >
        Add Todo
      </Button>
    </>
  );
};
