import React, { useState, useEffect } from "react";
import { Form, Modal } from "react-bootstrap";
import DateTimePicker from "react-datetime-picker";
import { useDispatch, useSelector } from "react-redux";
import { addTodo } from "../redux/todoSlice";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";
import TodoData from "./TodoData";
import moment from "moment";
import Nav from "./Nav";
import { TodoItem, Value } from "./Types";

const Todo: React.FC = () => {
  const [modalDisplay, setModalDisplay] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>("");
  const [timeOfTodo, onChange] = useState<Value>(moment().toDate());
  const [error, setError] = useState<boolean>(false);
  const [todoCompleted, setTodoCompleted] = useState<boolean>(false);
  const dispatch = useDispatch();
  const [items, setItems] = useState<TodoItem[]>([]);
  const [checkInput, setCheckInput] = useState<boolean>(true);

  const check = useSelector((state: any) => state.todos);
  console.log(check);

  const updateItemColors = () => {
    const updatedItems = check.map((item: TodoItem) => ({
      ...item,
      color: moment(item.dateTime).isBefore(moment())
        ? "red-dot"
        : "purple-dot",
    }));
    setItems([...updatedItems]);
  };

  const handleCheck = (id: number) => {
    const itemToUpdate = items.find((item) => item.id === id);
    if (itemToUpdate) {
      setTodoCompleted(!itemToUpdate.completed);
      const updatedItems = items.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      );
      setItems(updatedItems);
      setTodoCompleted(!itemToUpdate.completed);
    }
  };

  function calculateItemColor(dateTime: Date): string {
    return moment(dateTime).isBefore(moment()) ? "red-dot" : "purple-dot";
  }

  useEffect(() => {
    updateItemColors();
  }, [check]);
  const handleDone = () => {
    if (inputValue.trim() === "") {
      setCheckInput(false);
    } else {
      const selectedTime = moment(timeOfTodo as Date);
      const currentTime = moment();

      if (selectedTime.isAfter(currentTime)) {
        dispatch(
          addTodo({
            id: check.length + 1,
            text: inputValue,
            dateTime: selectedTime.toDate(),
            completed: todoCompleted,
            color: moment(selectedTime).isBefore(moment())
              ? "red-dot"
              : "purple-dot",
          })
        );
        setModalDisplay(false);
        setCheckInput(true);
        setInputValue("");
        setError(false);
      } else {
        setError(true);
        setModalDisplay(true);
      }
    }
  };
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newInputValue = event.target.value;
    setInputValue(newInputValue);
  };

  return (
    <div className="container">
      <Nav setModalDisplay={setModalDisplay} />
      <TodoData items={items} handleCheck={handleCheck} />
      <div className="addModal">
        <Modal
          show={modalDisplay}
          onHide={() => setModalDisplay(false)}
          className="modalContainer"
        >
          <Form.Group className="mb-3">
            <Form.Label>
              <p className="addText">Add Todo</p>
            </Form.Label>
            <Form.Control
              as="textarea"
              className={checkInput ? "black-border" : "red-border"}
              rows={3}
              value={inputValue}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Modal.Footer className="modalFooter">
            <p onClick={() => setModalDisplay(false)}>Cancel</p>
            <DateTimePicker onChange={onChange} value={timeOfTodo} />
            <p onClick={handleDone}>Done</p>
          </Modal.Footer>
          {error ? <p className="error-msg">"DO NOT SELECT PAST TIME"</p> : ""}
        </Modal>
      </div>
    </div>
  );
};
export default Todo;
