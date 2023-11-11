import { Container } from 'react-bootstrap';
import AddTodoItemContent from './components/todo/AddTodoItemContent';
import TodoItemsContent from './components/todo/TodoItemsContent';
import Footer from './components/layout/Footer';
import TestIntroduction from './components/TestIntroduction';
import './App.css';

const App = () => {
  return (
    <div className="App">
      <Container>
        <TestIntroduction />
        <AddTodoItemContent />
        <TodoItemsContent />
      </Container>
      <Footer />
    </div>
  );
};

export default App;
