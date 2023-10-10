import React from "react";
import { useState } from "react";
import { Form, Modal } from "react-bootstrap";
import DateTimePicker from "react-datetime-picker";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { addTodo } from "../redux/todoSlice";

interface TodoModalProps {
  modalDisplay: boolean;
  setModalDisplay: React.Dispatch<React.SetStateAction<boolean>>;
}

const TodoModal: React.FC<TodoModalProps> = ({
  modalDisplay,
  setModalDisplay,
}: TodoModalProps) => {
  const [checkInputOfTodo, setCheckInputOfTodoOfTodo] = useState<boolean>(true);
  const [timeOfTodo, setTimeOfTodo] = useState<Date>(new Date());
  const [todoTimeError, setTodoTimeError] = useState<boolean>(false);
  const [taskName, setTaskName] = useState<string>("");
  const [editedTodo, setEditedTodo] = useState<string>("a");
  const [todoCompleted, setTodoCompleted] = useState<boolean>(false);

  const dispatch = useDispatch();
  const todoListData = useSelector((state: any) => state.todos);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTaskName(event.target.value);
  };

  function calculateItemColor(dateTime: Date): string {
    return moment(dateTime).isBefore(moment()) ? "red-dot" : "purple-dot";
  }

  const handleDone = () => {
    if (taskName.trim() === "") {
      setCheckInputOfTodoOfTodo(false);
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
        setEditedTodo(todoListData);
        setCheckInputOfTodoOfTodo(true);
        setTaskName("");
        setTodoTimeError(false);
      } else {
        setTodoTimeError(true);
        setModalDisplay(true);
      }
    }
  };
  console.log(editedTodo, "textdelhh");

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
            value={taskName}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Modal.Footer className="modalFooter">
          <p onClick={() => setModalDisplay(false)}>Cancel</p>
          <DateTimePicker
            onChange={(value) => setTimeOfTodo(value as Date)}
            value={timeOfTodo}
          />
          <p onClick={handleDone}>Done</p>
        </Modal.Footer>
        {todoTimeError ? (
          <p className="error-msg">"DO NOT SELECT PAST TIME"</p>
        ) : null}
      </Modal>
    </div>
  );
};

export default TodoModal;
