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

  const updateTodoData = (newData :any) => {
    setTodoData((prevData) => ({
      ...prevData,
      ...newData,
    }));
  };

  return (
    <div className="container">
      <Nav setModalDisplay={() => updateTodoData({ modalDisplay: true })} />
      <TodoModal
        prevValueOfTodo={todoData.prevValueOfTodo}
        setPrevValueOfTodo={(value) => updateTodoData({ prevValueOfTodo: value })}
        modalDisplay={todoData.modalDisplay}
        setModalDisplay={() => updateTodoData({ modalDisplay: false })}
        prevIdOfTodo={todoData.prevIdOfTodo}
        setPrevidOfTodo={(id) => updateTodoData({ prevIdOfTodo: id })}
        prevTimeOfTodo={todoData.prevTimeOfTodo}
        setPrevTimeOfTodo={(time) => updateTodoData({ prevTimeOfTodo: time })}
      />
      <TodoList
        setModalDisplay={() => updateTodoData({ modalDisplay: true })}
        setPrevValueOfTodo={(value) => updateTodoData({ prevValueOfTodo: value })}
        setPrevidOfTodo={(id) => updateTodoData({ prevIdOfTodo: id })}
        setPrevTimeOfTodo={(time) => updateTodoData({ prevTimeOfTodo: time })}
      />
    </div>
  );
};

export default Todo;
