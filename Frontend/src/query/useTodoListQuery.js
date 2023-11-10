import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createTodoItem, getTodoItems, updateTodoItem } from '../api/todoApi';

const useTodoListQuery = () =>
  useQuery({
    queryKey: ['todoItems'],
    queryFn: async () => {
      const data = await getTodoItems();
      return data;
    },
  });

const useAddTodoMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (todoDescription) => createTodoItem(todoDescription),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todoItems'] });
    },
  });
};

const useUpdateTodoMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (todoItem) => updateTodoItem(todoItem),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todoItems'] });
    },
  });
};

export { useTodoListQuery, useAddTodoMutation, useUpdateTodoMutation };
