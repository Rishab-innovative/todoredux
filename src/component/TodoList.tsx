import React from "react";
import { ListGroup, Form } from "react-bootstrap";
import { CiAlarmOn } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { toggleTodo } from "../redux/todoSlice";

const TodoList: React.FC = () => {
  const dispatch = useDispatch();
  const todoListData = useSelector((state: any) => state.todos);
  return (
    <div className="todo-wrapper">
      <ListGroup variant="flush">
        {todoListData &&
          todoListData?.map((element: any) => (
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

export default TodoList;
