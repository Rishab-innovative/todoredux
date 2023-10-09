import React from "react";
import { ListGroup, Form } from "react-bootstrap";
import { CiAlarmOn } from "react-icons/ci";
import { useDispatch } from "react-redux";
import { toggleTodo } from "../redux/todoSlice";

type TodoDataProps = {
  items: any[];
  handleCheck: (id: number) => void;
};

const TodoData: React.FC<TodoDataProps> = ({ items, handleCheck }) => {
  const dispatch = useDispatch();
  return (
    <div className="todo-wrapper">
      <ListGroup variant="flush">
        {items &&
          items?.map((element: any) => (
            <ListGroup.Item key={element.id}>
              <div className="container-box">
                <Form.Check
                  type="checkbox"
                  label={element.text}
                  onChange={() => {
                    dispatch(toggleTodo(element.id));
                  }}
                />
                <span
                  className={element.completed ? "green-dot" : element.color}
                ></span>
              </div>
              <div className="display-time">
                <CiAlarmOn />
                {element.dateTime.toLocaleString()}
              </div>
            </ListGroup.Item>
          ))}
      </ListGroup>
    </div>
  );
};

export default TodoData;
