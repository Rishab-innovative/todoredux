import React from "react";
import { IoAddCircleOutline } from "react-icons/io5";

type NavProps = {
  setModalDisplay: (data: any) => void;
};

const Nav: React.FC<NavProps> = ({ setModalDisplay }: NavProps) => {
  const handleAddTodoClick = () => {
    setModalDisplay((prevData: any) => ({
      ...prevData,
      modalDisplay: true,
    }));
  };

  return (
    <div className="nav">
      <p>Today</p>
      <IoAddCircleOutline onClick={handleAddTodoClick} />
    </div>
  );
};

export default Nav;
