import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTodo } from "../redux/todoSlice";
import Nav from "./Nav";
import TodoData from "./TodoData";
import TodoModal from "./TodoModal";
import moment from "moment";
import { TodoItem } from "./Types";

const Todo: React.FC = () => {
  const [modalDisplay, setModalDisplay] = useState<boolean>(false);
  const [taskName, setTaskName] = useState<string>("");
  const [timeOfTodo, setTimeOfTodo] = useState<Date>(new Date());
  const [error, setError] = useState<boolean>(false);
  const [todoCompleted, setTodoCompleted] = useState<boolean>(false);
  const [checkInput, setCheckInput] = useState<boolean>(true);
  const check = useSelector((state: any) => state.todos);
  const dispatch = useDispatch();

  // console.log(check[0].id, "****");

  const handleCheck = (id: number) => {
    const itemToUpdate = check.find((item: any) => item.id === id);
    if (itemToUpdate) {
      setTodoCompleted(!itemToUpdate.completed);
      const updatedItems = check.map((item: any) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      );
      dispatch(addTodo(updatedItems));
      setTodoCompleted(!itemToUpdate.completed);
    }
  };

  const calculateItemColor = (dateTime: Date): string => {
    return moment(dateTime).isBefore(moment()) ? "red-dot" : "purple-dot";
  };

  const handleDone = () => {
    if (taskName.trim() === "") {
      setCheckInput(false);
    } else {
      const selectedTime = moment(timeOfTodo as Date);
      const currentTime = moment();
      if (selectedTime.isAfter(currentTime)) {
        const newTodo = {
          id: check.length + 1,
          text: taskName,
          dateTime: selectedTime.toDate(),
          completed: todoCompleted,
          color: moment(selectedTime).isBefore(moment())
            ? "red-dot"
            : "purple-dot",
        };
        dispatch(addTodo(newTodo));
        setModalDisplay(false);
        setCheckInput(true);
        setTaskName("");
        setError(false);
      } else {
        setError(true);
        setModalDisplay(true);
      }
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newInputValue = event.target.value;
    setTaskName(newInputValue);
  };

  return (
    <div className="container">
      <Nav setModalDisplay={setModalDisplay} />
      <TodoModal
        modalDisplay={modalDisplay}
        setModalDisplay={setModalDisplay}
        taskName={taskName}
        handleInputChange={handleInputChange}
        timeOfTodo={timeOfTodo}
        setTimeOfTodo={setTimeOfTodo}
        handleDone={handleDone}
        checkInput={checkInput}
        error={error}
      />
      <TodoData items={check} handleCheck={handleCheck} />
    </div>
  );
};
export default Todo;
