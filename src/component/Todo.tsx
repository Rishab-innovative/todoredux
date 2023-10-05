import React, { useState } from "react";
import { Form, Modal } from "react-bootstrap";
import DateTimePicker from "react-datetime-picker";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";
import moment from "moment";
import TodoData from "./TodoData";
import Nav from "./Nav";
import { connect } from "react-redux";
import { addTodo, toggleTodo } from "../action/Actions";
import { TodoItem, Value } from "./Types";
import { Dispatch } from "redux";

type TodoProps = {
  items: TodoItem[];
  handleCheck: (id: number) => void;
};

const mapStateToProps = (state: TodoItem[]) => ({
  items: state,
});


const mapDispatchToProps = {
  handleCheck: toggleTodo,
};

const Todo: React.FC<TodoProps> = (props) => {
  const [items, setItems] = useState<TodoItem[]>([]);
  const [error, setError] = useState<boolean>(false);
  const [timeOfTodo, onChange] = useState<Value>(moment().toDate());
  const [modalDisplay, setModalDisplay] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>("");
  const [checkInput, setCheckInput] = useState<boolean>(true);

  const updateItemColors = () => {
    const updatedItems = items.map((item) => {
      if (moment(item.dateTime).isBefore(moment())) {
        return { ...item, color: "red-dot" };
      } else {
        return item;
      }
    });
    setItems(updatedItems);
  };

  const handleDone = () => {
    if (inputValue.trim() === "") {
      setCheckInput(false);
    } else {
      const selectedTime = moment(timeOfTodo as Date);
      const currentTime = moment();

      if (selectedTime.isAfter(currentTime)) {
        const newTodoItem: TodoItem = {
          id: items.length + 1,
          text: inputValue,
          dateTime: selectedTime.toDate(),
          completed: false,
          color: "purple-dot",
        };
        setModalDisplay(false);
        setCheckInput(true);
        setItems([...items, newTodoItem]);
        setInputValue("");
        setError(false);
      } else {
        updateItemColors();
        setError(true);
        setModalDisplay(true);
      }
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
    updateItemColors();
  };

  return (
    <div className="container">
      <Nav setModalDisplay={setModalDisplay} />
      {/* <TodoData items={items} handleCheck={props.handleCheck} /> */}
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
export default connect(mapStateToProps, mapDispatchToProps)(Todo);
