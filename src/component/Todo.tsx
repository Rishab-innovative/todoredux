import React, { useState } from "react";
import Nav from "./Nav";
import TodoList from "./TodoList";
import TodoModal from "./TodoModal";

const Todo: React.FC = () => {
  const [modalDisplay, setModalDisplay] = useState<boolean>(false);
  const [prevValueOfTodo, setPrevValueOfTodo] = useState<string>("");
  const [prevIdOfTodo, setPrevidOfTodo] = useState<number>(0);
  const [prevTimeOfTodo, setPrevTimeOfTodo] = useState<Date>(new Date());

  return (
    <div className="container">
      <Nav setModalDisplay={setModalDisplay} />
      <TodoModal
        prevValueOfTodo={prevValueOfTodo}
        setPrevValueOfTodo={setPrevValueOfTodo}
        modalDisplay={modalDisplay}
        setModalDisplay={setModalDisplay}
        prevIdOfTodo={prevIdOfTodo}
        setPrevidOfTodo={setPrevidOfTodo}
        prevTimeOfTodo={prevTimeOfTodo}
        setPrevTimeOfTodo={setPrevTimeOfTodo}
      />
      <TodoList
        setModalDisplay={setModalDisplay}
        setPrevValueOfTodo={setPrevValueOfTodo}
        setPrevidOfTodo={setPrevidOfTodo}
        setPrevTimeOfTodo={setPrevTimeOfTodo}
      />
    </div>
  );
};
export default Todo;
