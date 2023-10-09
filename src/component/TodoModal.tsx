import React from "react";
import { Form, Modal } from "react-bootstrap";
import DateTimePicker from "react-datetime-picker";
import { useDispatch } from "react-redux";

interface TodoModalProps {
  modalDisplay: boolean;
  setModalDisplay: React.Dispatch<React.SetStateAction<boolean>>;
  taskName: string;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  timeOfTodo: Date;
  setTimeOfTodo: React.Dispatch<React.SetStateAction<Date>>;
  handleDone: () => void;
  checkInput: boolean;
  error: boolean;
}

const TodoModal: React.FC<TodoModalProps> = ({
  modalDisplay,
  setModalDisplay,
  taskName,
  handleInputChange,
  timeOfTodo,
  setTimeOfTodo,
  handleDone,
  checkInput,
  error,
}: TodoModalProps) => {
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
            className={checkInput ? "black-border" : "red-border"}
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
        {error ? <p className="error-msg">"DO NOT SELECT PAST TIME"</p> : null}
      </Modal>
    </div>
  );
};

export default TodoModal;
