import { Button, Table, Spinner } from 'react-bootstrap';
import { useQueryClient } from '@tanstack/react-query';
import { useTodoListQuery, useUpdateTodoMutation } from '../../query/useTodoListQuery';

const TodoItemsContent = () => {
  const { data: items = [], isFetching } = useTodoListQuery();
  const { mutate } = useUpdateTodoMutation();
  const queryClient = useQueryClient();

  async function handleMarkAsComplete(item) {
    mutate({ ...item, isCompleted: !item.isCompleted });
  }

  async function getItems() {
    queryClient.invalidateQueries({ queryKey: ['todoItems'] });
  }

  console.log(`Loading status: `, isFetching);

  return (
    <>
      <h1>
        {isFetching && <Spinner />}
        Showing {items.length} Item(s){' '}
        <Button variant="primary" className="pull-right" onClick={() => getItems()}>
          Refresh
        </Button>
      </h1>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Id</th>
            <th>Description</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id} style={{ textDecoration: item.isCompleted ? 'line-through' : 'unset' }}>
              <td>{item.id}</td>
              <td>{item.description}</td>
              <td>
                <Button
                  variant={item.isCompleted ? 'success' : 'warning'}
                  size="sm"
                  onClick={() => handleMarkAsComplete(item)}
                >
                  {item.isCompleted ? 'Mark uncompleted' : 'Mark as completed'}
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default TodoItemsContent;
