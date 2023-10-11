import React from "react";
import { ListGroup, Form } from "react-bootstrap";
import { CiAlarmOn, CiTrash, CiEdit } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { toggleTodo, deleteTodo } from "../redux/todoSlice";

interface TodoModalProps {
  setModalDisplay: React.Dispatch<React.SetStateAction<boolean>>;
  setPrevValueOfTodo: React.Dispatch<React.SetStateAction<string>>;
  setPrevidOfTodo: React.Dispatch<React.SetStateAction<number>>;
  setPrevTimeOfTodo: React.Dispatch<React.SetStateAction<Date>>;
}

const TodoList: React.FC<TodoModalProps> = ({
  setModalDisplay,
  setPrevValueOfTodo,
  setPrevidOfTodo,
  setPrevTimeOfTodo,
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
                    setModalDisplay(true);
                    setPrevValueOfTodo(element.text);
                    setPrevidOfTodo(element.id);
                    setPrevTimeOfTodo(element.dateTime);
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
