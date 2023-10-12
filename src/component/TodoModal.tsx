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
  const [checkInputOfTodo, setCheckInputOfTodo] = useState<boolean>(true);
  const [timeOfTodo, setTimeOfTodo] = useState<Date>(new Date());
  const [todoTimeError, setTodoTimeError] = useState<boolean>(false);
  const [taskName, setTaskName] = useState<string>("");
  const [todoCompleted, setTodoCompleted] = useState<boolean>(false);
  const [checkValueOfTodo, setCheckValueOfTodo] = useState<boolean>();

  const dispatch = useDispatch();
  const todoListData = useSelector((state: any) => state.todos);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    todoData.prevIdOfTodo
      ? setTodoData((prevData: any) => ({
          ...prevData,
          prevValueOfTodo: event.target.value,
        }))
      : setTaskName(event.target.value);
    setCheckInputOfTodo(true);
  };
  function calculateItemColor(dateTime: Date): string {
    return moment(dateTime).isBefore(moment()) ? "red-dot" : "purple-dot";
  }

  useEffect(() => {
    if (todoData.modalDisplay) {
      setCheckValueOfTodo(todoData.prevValueOfTodo.length > 0);
    }
  }, [todoData.modalDisplay, todoData.prevValueOfTodo]);

  const handleEdit = () => {
    if (todoData.prevValueOfTodo.trim() === "") {
      setCheckInputOfTodo(false);
    } else {
      const selectedTime = moment(timeOfTodo as Date);
      const currentTime = moment();
      if (selectedTime.isAfter(currentTime)) {
        const updatedTodo = {
          id: todoData.prevIdOfTodo,
          text: todoData.prevValueOfTodo,
          dateTime: selectedTime.toDate(),
          completed: todoCompleted,
          color: calculateItemColor(todoData.prevTimeOfTodo),
        };
        dispatch(updateTodoList(updatedTodo));
        setTodoData((prevData: any) => ({
          ...prevData,
          modalDisplay: false,
        }));
        setTodoTimeError(false);
        setTodoData((prevData: any) => ({
          ...prevData,
          prevValueOfTodo: "",
        }));
        setTimeOfTodo(new Date());
        setTodoData((prevData: any) => ({
          ...prevData,
          prevIdOfTodo: 0,
        }));
      } else {
        setTodoTimeError(true);
      }
    }
  };
  const handleDone = () => {
    if (taskName.trim() === "" && !checkValueOfTodo) {
      setCheckInputOfTodo(false);
    } else {
      const selectedTime = moment(timeOfTodo as Date);
      const currentTime = moment();
      if (selectedTime.isAfter(currentTime)) {
        const newTodo = {
          id: todoListData.length + 1,
          text: taskName,
          dateTime: selectedTime.toDate(),
          completed: todoCompleted,
          color: calculateItemColor(selectedTime.toDate()),
        };
        dispatch(addTodo(newTodo));
        setTodoData((prevData: any) => ({
          ...prevData,
          modalDisplay: false,
        }));
        setTodoData((prevData: any) => ({
          ...prevData,
          prevValueOfTodo: "",
        }));
        setCheckInputOfTodo(true);
        setTaskName("");
        setTimeOfTodo(new Date());
        setTodoTimeError(false);
      } else {
        setTodoTimeError(true);
      }
    }
  };
  const handleCancel = () => {
    setTodoData((prevData: any) => ({
      ...prevData,
      modalDisplay: false,
    }));
    setCheckInputOfTodo(true);
    setTaskName("");
    setTodoData((prevData: any) => ({
      ...prevData,
      prevValueOfTodo: "",
    }));
    setTimeOfTodo(new Date());
    setTodoTimeError(false);
  };
  return (
    <div className="addModal">
      <Modal
        show={todoData.modalDisplay}
        onHide={() =>
          setTodoData((prevData: any) => ({
            ...prevData,
            modalDisplay: false,
          }))
        }
        className="modalContainer"
      >
        <Form.Group className="mb-3">
          <Form.Label>
            <p className="addText">Add Todo</p>
          </Form.Label>
          <Form.Control
            as="textarea"
            className={checkInputOfTodo ? "black-border" : "red-border"}
            rows={3}
            value={checkValueOfTodo ? todoData.prevValueOfTodo : taskName}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Modal.Footer className="modalFooter">
          <p onClick={() => handleCancel()}>Cancel</p>
          <DateTimePicker
            onChange={(value) => {
              setTimeOfTodo(value as Date);
              setTodoData((prevData: any) => ({
                ...prevData,
                prevTimeOfTodo: value as Date,
              }));
            }}
            value={checkValueOfTodo ? todoData.prevTimeOfTodo : timeOfTodo}
          />
          {todoData.prevIdOfTodo ? (
            <p onClick={handleEdit}>Save</p>
          ) : (
            <p onClick={handleDone}>Done</p>
          )}
        </Modal.Footer>
        {todoTimeError ? (
          <p className="error-msg">"DO NOT SELECT PAST TIME"</p>
        ) : null}
      </Modal>
    </div>
  );
};

export default TodoModal;
