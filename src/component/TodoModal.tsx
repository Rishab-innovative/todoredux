import React from "react";
import { useState, useEffect } from "react";
import { Form, Modal } from "react-bootstrap";
import DateTimePicker from "react-datetime-picker";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { addTodo, updateTodoList } from "../redux/todoSlice";

interface TodoModalProps {
  modalDisplay: boolean;
  setModalDisplay: React.Dispatch<React.SetStateAction<boolean>>;
  prevValueOfTodo: string;
  setPrevValueOfTodo: React.Dispatch<React.SetStateAction<string>>;
  prevIdOfTodo: number;
  setPrevidOfTodo: React.Dispatch<React.SetStateAction<number>>;
  prevTimeOfTodo: Date;
  setPrevTimeOfTodo: React.Dispatch<React.SetStateAction<Date>>;
}
const TodoModal: React.FC<TodoModalProps> = ({
  modalDisplay,
  setModalDisplay,
  prevValueOfTodo,
  setPrevValueOfTodo,
  prevIdOfTodo,
  setPrevidOfTodo,
  prevTimeOfTodo,
  setPrevTimeOfTodo,
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
    prevIdOfTodo
      ? setPrevValueOfTodo(event.target.value)
      : setTaskName(event.target.value);
    setCheckInputOfTodo(true);
  };

  function calculateItemColor(dateTime: Date): string {
    return moment(dateTime).isBefore(moment()) ? "red-dot" : "purple-dot";
  }

  useEffect(() => {
    if (modalDisplay) {
      setCheckValueOfTodo(prevValueOfTodo.length > 0);
    }
  }, [modalDisplay, prevValueOfTodo]);

  const handleEdit = () => {
    const selectedTime = moment(timeOfTodo as Date);
    const updatedTodo = {
      id: prevIdOfTodo,
      text: prevValueOfTodo,
      dateTime: selectedTime.toDate(),
      completed: todoCompleted,
      color: calculateItemColor(prevTimeOfTodo),
    };
    dispatch(updateTodoList(updatedTodo));
    setModalDisplay(false);
    setTodoTimeError(false);
    setPrevValueOfTodo("");
    setTimeOfTodo(new Date());
    setPrevidOfTodo(0);
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
        setModalDisplay(false);
        setPrevValueOfTodo("");
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
    setModalDisplay(false);
    setCheckInputOfTodo(true);
    setTaskName("");
    setTimeOfTodo(new Date());
    setTodoTimeError(false);
  };
  return (
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
            className={checkInputOfTodo ? "black-border" : "red-border"}
            rows={3}
            value={checkValueOfTodo ? prevValueOfTodo : taskName}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Modal.Footer className="modalFooter">
          <p onClick={() => handleCancel()}>Cancel</p>
          <DateTimePicker
            onChange={(value) => setTimeOfTodo(value as Date)}
            value={checkValueOfTodo ? prevTimeOfTodo : timeOfTodo}
          />
          {prevIdOfTodo ? (
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
