import React, { useState } from "react";
import Nav from "./Nav";
import TodoList from "./TodoList";
import TodoModal from "./TodoModal";

const Todo: React.FC = () => {
  
  const [todoData, setTodoData] = useState({
    modalDisplay: false,
    prevValueOfTodo: "",
    prevIdOfTodo: 0,
    prevTimeOfTodo: new Date(),
  });

  return (
    <div className="container">
      <Nav setModalDisplay={setTodoData} />
      <TodoModal todoData={todoData} setTodoData={setTodoData} />
      <TodoList setTodoData={setTodoData}  />
    </div>
  );
};
export default Todo;
