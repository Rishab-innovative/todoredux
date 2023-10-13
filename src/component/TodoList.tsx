import React from "react";
import { ListGroup, Form } from "react-bootstrap";
import { CiAlarmOn, CiTrash, CiEdit } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { toggleTodo, deleteTodo } from "../redux/todoSlice";

interface TodoModalProps {
  setTodoData: (data: any) => void;
}

const TodoList: React.FC<TodoModalProps> = ({
  setTodoData,
}: TodoModalProps) => {
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
                <span
                  onClick={() => {
                    setTodoData((prevData: any) => ({
                      ...prevData,
                      modalDisplay: true,
                    }));
                    setTodoData((prevData: any) => ({
                      ...prevData,
                      prevValueOfTodo: (element.text),
                    }));
                    setTodoData((prevData: any) => ({
                      ...prevData,
                      prevIdOfTodo: (element.id),
                    }));
                    setTodoData((prevData: any) => ({
                      ...prevData,
                      prevTimeOfTodo: (element.dateTime),
                    }));
                  }}
                >
                  <CiEdit />
                </span>

                <span
                  onClick={() => {
                    dispatch(deleteTodo(element.id));
                  }}
                >
                  <CiTrash />
                </span>
              </div>
            </ListGroup.Item>
          ))}
      </ListGroup>
    </div>
  );
};

export default TodoList;
