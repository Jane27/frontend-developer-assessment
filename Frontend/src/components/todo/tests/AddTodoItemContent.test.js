import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithClient } from '../../../utils/testUtil';
import AddTodoItemContent from '../AddTodoItemContent';
import { createTodoItem } from '../../../api/todoApi';

jest.mock('../../../api/todoApi');

describe('<AddTodoItemContent />', () => {
  test('should render add todo form', () => {
    renderWithClient(<AddTodoItemContent />);
    expect(screen.getByRole('heading')).toHaveTextContent('Add Item');
    expect(screen.getByLabelText('Description')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Add Item' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Clear' })).toBeInTheDocument();
  });

  test('should display validation error if description is empty', async () => {
    const user = userEvent.setup();
    renderWithClient(<AddTodoItemContent />);

    const input = screen.getByLabelText('Description');
    const addButton = screen.getByRole('button', { name: 'Add Item' });

    expect(input.value).toBe('');
    await user.click(addButton);

    expect(screen.getByText('Description is required.')).toBeInTheDocument();
  });

  test('should be able to add a new todo', async () => {
    createTodoItem.mockImplementation(jest.fn(() => []));

    const user = userEvent.setup();
    renderWithClient(<AddTodoItemContent />);

    const input = screen.getByLabelText('Description');
    const addButton = screen.getByRole('button', { name: 'Add Item' });

    await user.type(input, 'Walk dog tomorrow');
    expect(input.value).toBe('Walk dog tomorrow');

    await user.click(addButton);
    expect(createTodoItem).toHaveBeenCalled();
  });

  test('should reset form state after click clear button', async () => {
    const user = userEvent.setup();
    renderWithClient(<AddTodoItemContent />);

    const input = screen.getByLabelText('Description');
    const clearButton = screen.getByRole('button', { name: 'Clear' });

    await user.type(input, 'Walk dog tomorrow');
    expect(input.value).toBe('Walk dog tomorrow');

    await user.click(clearButton);
    expect(input.value).toBe('');
  });
});
