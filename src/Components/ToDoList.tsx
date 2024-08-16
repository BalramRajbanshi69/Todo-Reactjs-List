import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlusCircle,
  faTrash,
  faPencilAlt,
  faSave,
} from "@fortawesome/free-solid-svg-icons";
import {
  Card,
  InputGroup,
  FormControl,
  Button,
  Container,
  Row,
  Col,
} from "react-bootstrap";

function TodoList() {
  const [todos, setTodos] = useState([
    { id: 1, text: "Eat regularly", editing: false },
    { id: 2, text: "Wake up early", editing: false },
    { id: 3, text: "Ready for College", editing: false },
  ]);
  const [newTodo, setNewTodo] = useState("");

  const handleInputChange = (e) => {
    setNewTodo(e.target.value);
  };

  const handleAddTodo = () => {
    if (newTodo.trim() !== "") {
      setTodos([
        ...todos,
        { id: todos.length + 1, text: newTodo, editing: false },
      ]);
      setNewTodo("");
    }
  };

  const handleDeleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleEditTodo = (id) => {
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, editing: true } : todo))
    );
  };

  const handleSaveEdit = (id, newText) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, text: newText, editing: false } : todo
      )
    );
  };

  const handleCancelEdit = (id) => {
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, editing: false } : todo))
    );
  };

  return (
    <Container fluid style={{ backgroundColor: "dark" }}>
      <Row className="justify-content-center align-items-center vh-100">
        <Col md={6}>
          <Card className="bg-light text-dark">
            <Card.Header className="bg-danger text-white text-center">
              Todo List
            </Card.Header>
            <Card.Body>
              <InputGroup className="mb-3">
                <FormControl
                  placeholder="Add a todo"
                  aria-label="Todo"
                  aria-describedby="basic-addon2"
                  value={newTodo}
                  onChange={handleInputChange}
                />
                <Button
                  variant="success"
                  id="button-addon2"
                  onClick={handleAddTodo}
                >
                  <FontAwesomeIcon icon={faPlusCircle} />
                  Add
                </Button>
              </InputGroup>
              <ul className="list-group list-group-flush">
                {todos.map((todo) => (
                  <li
                    key={todo.id}
                    className="list-group-item d-flex justify-content-between align-items-center"
                  >
                    {todo.editing ? (
                      <InputGroup>
                        <FormControl
                          value={todo.text}
                          onChange={(e) =>
                            setTodos(
                              todos.map((t) =>
                                t.id === todo.id
                                  ? { ...t, text: e.target.value }
                                  : t
                              )
                            )
                          }
                        />
                        <Button
                          variant="success"
                          size="sm"
                          onClick={() => handleSaveEdit(todo.id, todo.text)}
                        >
                          <FontAwesomeIcon icon={faSave} />
                          Save
                        </Button>
                        <Button
                          variant="danger"
                          size="sm"
                          className="mx-1"
                          onClick={() => handleCancelEdit(todo.id)}
                        >
                          <FontAwesomeIcon icon={faTrash} />
                          Cancel
                        </Button>
                      </InputGroup>
                    ) : (
                      <span className="text-dark"> &#8594; {todo.text}</span>
                    )}
                    <div className="d-flex">
                      <Button
                        className="btn btn-danger"
                        size="sm"
                        onClick={() => handleDeleteTodo(todo.id)}
                      >
                        <FontAwesomeIcon icon={faTrash} />
                        Delete
                      </Button>
                      <Button
                        className="btn btn-primary mx-1"
                        size="sm"
                        onClick={() => handleEditTodo(todo.id)}
                      >
                        <FontAwesomeIcon icon={faPencilAlt} />
                        Edit
                      </Button>
                    </div>
                  </li>
                ))}
              </ul>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default TodoList;
