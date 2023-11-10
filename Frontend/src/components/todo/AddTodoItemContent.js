import React, { useState } from 'react';
import { Button, Container, Row, Col, Form, Stack } from 'react-bootstrap';
import { useAddTodoMutation } from '../../query/useTodoListQuery';

const AddTodoItemContent = () => {
  const [description, setDescription] = useState('');
  const [validated, setValidated] = useState(false);

  const { mutateAsync: addTodo } = useAddTodoMutation();

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  async function handleAdd(event) {
    event.preventDefault();
    event.stopPropagation();

    // Update form to display validation result
    setValidated(true);

    const form = event.currentTarget;
    if (!form.checkValidity()) {
      return;
    }

    // Validation passed, trigger add todo mutation to API
    await addTodo(description);

    // Clear form after succeed
    handleClear();
  }

  function handleClear() {
    setDescription('');

    // Reset form validation status
    setValidated(false);
  }

  return (
    <Container>
      <h1>Add Item</h1>
      <Form noValidate validated={validated} onSubmit={handleAdd}>
        <Form.Group as={Row} className="mb-3" controlId="formAddTodoItem">
          <Form.Label column sm="2">
            Description
          </Form.Label>
          <Col md="6">
            <Form.Control
              required
              type="text"
              placeholder="Enter description..."
              value={description}
              onChange={handleDescriptionChange}
            />
            <Form.Control.Feedback type="invalid">Description is required.</Form.Control.Feedback>
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3 offset-md-2" controlId="formAddTodoItem">
          <Stack direction="horizontal" gap={2}>
            <Button variant="primary" type="submit">
              Add Item
            </Button>
            <Button variant="secondary" onClick={() => handleClear()}>
              Clear
            </Button>
          </Stack>
        </Form.Group>
      </Form>
    </Container>
  );
};

export default AddTodoItemContent;
