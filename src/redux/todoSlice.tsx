import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import moment from "moment";

interface TodoItem {
  id: number;
  text: string;
  dateTime: Date;
  completed: boolean;
  color: string;
}
interface TodoState {
  todos: TodoItem[];
}
const initialState: TodoState = {
  todos: [],
};
const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<TodoItem>) => {
      state.todos.push(action.payload);
    },
    toggleTodo: (state, action: PayloadAction<number>) => {
      const todo = state.todos.find((item) => item.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
        todo.color = moment(todo.dateTime).isBefore(moment())
          ? "red-dot"
          : "purple-dot";
      }
    },
  },
});
export const { addTodo, toggleTodo} = todoSlice.actions;
export default todoSlice.reducer;
