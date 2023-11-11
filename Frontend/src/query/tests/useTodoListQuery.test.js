import { renderHook, waitFor } from '@testing-library/react';
import { getTodoItems } from '../../api/todoApi';
import { useTodoListQuery } from '../useTodoListQuery';
import { createWrapper } from '../../utils/testUtil';

jest.mock('../../api/todoApi');

test('should return todo items from todo list query', async () => {
  const mockedTodoItems = [
    { id: '1', description: 'coco' },
    { id: '2', description: 'cola' },
    { id: '3', description: 'pipi' },
  ];

  getTodoItems.mockImplementation(() => mockedTodoItems);

  const { result } = renderHook(() => useTodoListQuery(), { wrapper: createWrapper() });

  await waitFor(() => expect(result.current.isSuccess).toBe(true));
  expect(result.current.data).toEqual(mockedTodoItems);
});
