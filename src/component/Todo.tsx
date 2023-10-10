import React, { useState } from "react";
import Nav from "./Nav";
import TodoList from "./TodoList";
import TodoModal from "./TodoModal";

const Todo: React.FC = () => {
  const [modalDisplay, setModalDisplay] = useState<boolean>(false);

  return (
    <div className="container">
      <Nav setModalDisplay={setModalDisplay} />
      <TodoModal
        modalDisplay={modalDisplay}
        setModalDisplay={setModalDisplay}
      />
      <TodoList />
    </div>
  );
};
export default Todo;
