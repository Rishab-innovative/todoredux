import React from "react";
import { useState, useEffect } from "react";
import { Form, Modal } from "react-bootstrap";
import DateTimePicker from "react-datetime-picker";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { addTodo, updateTodoList } from "../redux/todoSlice";

type TodoModalProps = {
  todoData: any;
  setTodoData: (data: any) => void;
};
const TodoModal: React.FC<TodoModalProps> = ({
  todoData,
  setTodoData,
}: TodoModalProps) => {
  const [inputDataOfTodo, setInputDataOfTodo] = useState({
    validationOfInputField: true,
    timeOfTodo: new Date(),
    todoTimeError: false,
    taskName: "",
    todoCompleted: false,
    checkValueOfTodo: false,
  });
  const dispatch = useDispatch();
  const todoListData = useSelector((state: any) => state.todos);

  useEffect(() => {
    if (todoData.prevIdOfTodo) {
      setInputDataOfTodo((prev: any) => ({
        ...prev,
        taskName: todoData.prevValueOfTodo,
        timeOfTodo: todoData.prevTimeOfTodo,
        validationOfInputField: true,
      }));
    }
  }, [
    todoData.prevIdOfTodo,
    todoData.prevValueOfTodo,
    todoData.prevTimeOfTodo,
  ]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputDataOfTodo((prev: any) => ({
      ...prev,
      taskName: event.target.value,
      validationOfInputField: true,
    }));
  };
  const handleTimeChange = (value: any) => {
    console.log(value, ":valueod dateINSIDE TIMEFUNC");
    setInputDataOfTodo((prev: any) => ({
      ...prev,
      timeOfTodo: value as Date,
    }));
  };
  function calculateItemColor(dateTime: Date): string {
    return moment(dateTime).isBefore(moment()) ? "red-dot" : "purple-dot";
  }

  useEffect(() => {
    if (todoData.modalDisplay) {
      setInputDataOfTodo((prev: any) => ({
        ...prev,
        checkValueOfTodo: todoData.prevValueOfTodo.length > 0,
      }));
    }
  }, [todoData.modalDisplay, todoData.prevValueOfTodo, todoData.D]);

  const handleEdit = () => {
    if (todoData.prevValueOfTodo.trim() === "") {
      setInputDataOfTodo((prev: any) => ({
        ...prev,
        validationOfInputField: false,
      }));
    } else {
      let selectedTime = moment(inputDataOfTodo.timeOfTodo as Date);
      const currentTime = moment();
      const prevTime = moment(todoData.prevTimeOfTodo);
      if (selectedTime.isAfter(currentTime) && prevTime.isAfter(currentTime)) {
        selectedTime = prevTime;
        const updatedTodo = {
          id: todoData.prevIdOfTodo,
          text: inputDataOfTodo.taskName,
          dateTime: selectedTime.toDate(),
          completed: inputDataOfTodo.todoCompleted,
          color: calculateItemColor(todoData.prevTimeOfTodo),
        };
        dispatch(updateTodoList(updatedTodo));
        setTodoData((prevData: any) => ({
          ...prevData,
          prevIdOfTodo: 0,
          modalDisplay: false,
        }));
        setInputDataOfTodo((prev: any) => ({
          ...prev,
          todoTimeError: false,
          taskName: "",
          timeOfTodo: new Date(),
        }));
      } else {
        setInputDataOfTodo((prev: any) => ({
          ...prev,
          todoTimeError: true,
        }));
      }
    }
  };
  const handleDone = () => {
    if (
      inputDataOfTodo.taskName.trim() === "" &&
      !inputDataOfTodo.checkValueOfTodo
    ) {
      setInputDataOfTodo((prev: any) => ({
        ...prev,
        validationOfInputField: false,
      }));
    } else {
      const selectedTime = moment(inputDataOfTodo.timeOfTodo as Date);
      const currentTime = moment();
      if (selectedTime.isAfter(currentTime)) {
        const newTodo = {
          id: todoListData.length + 1,
          text: inputDataOfTodo.taskName,
          dateTime: selectedTime.toDate(),
          completed: inputDataOfTodo.todoCompleted,
          color: calculateItemColor(selectedTime.toDate()),
        };
        dispatch(addTodo(newTodo));
        setTodoData((prevData: any) => ({
          ...prevData,
          prevValueOfTodo: "",
          modalDisplay: false,
        }));
        setInputDataOfTodo((prev: any) => ({
          ...prev,
          validationOfInputField: true,
          taskName: "",
          timeOfTodo: new Date(),
          todoTimeError: false,
        }));
      } else {
        setInputDataOfTodo((prev: any) => ({
          ...prev,
          todoTimeError: true,
        }));
      }
    }
  };
  const resetState = () => {
    setTodoData((prevData: any) => ({
      ...prevData,
      modalDisplay: false,
      prevValueOfTodo: "",
    }));
    setInputDataOfTodo({
      validationOfInputField: true,
      timeOfTodo: new Date(),
      todoTimeError: false,
      taskName: "",
      todoCompleted: false,
      checkValueOfTodo: false,
    });
  };
  return (
    <div className="addModal">
      <Modal
        show={todoData.modalDisplay}
        onHide={() => resetState()}
        className="modalContainer"
      >
        <Form.Group className="mb-3">
          <Form.Label>
            <p className="addText">Add Todo</p>
          </Form.Label>
          <Form.Control
            as="textarea"
            className={
              inputDataOfTodo.validationOfInputField
                ? "black-border"
                : "red-border"
            }
            rows={3}
            value={inputDataOfTodo.taskName}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Modal.Footer className="modalFooter">
          <p onClick={() => resetState()}>Cancel</p>
          <DateTimePicker
            onChange={handleTimeChange}
            value={inputDataOfTodo.timeOfTodo}
          />
          {todoData.prevIdOfTodo ? (
            <p onClick={handleEdit}>Save Edited Todo</p>
          ) : (
            <p onClick={handleDone}>Save New Todo</p>
          )}
        </Modal.Footer>
        {inputDataOfTodo.todoTimeError ? (
          <p className="error-msg">"DO NOT SELECT PAST TIME"</p>
        ) : null}
      </Modal>
    </div>
  );
};

export default TodoModal;
