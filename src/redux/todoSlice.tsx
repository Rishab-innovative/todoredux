import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import moment from "moment";

interface TodoItem {
  id: Number;
  text: String;
  dateTime: Date;
  completed: Boolean;
  color: String;
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
      let list = [...state.todos];
      list.push(action.payload);
      state.todos = [...list];
      const updatedItems = state.todos.map((item) => ({
        ...item,
        color: moment(item.dateTime).isBefore(moment())
          ? "red-dot"
          : "purple-dot",
      }));
      state.todos = [...updatedItems];
    },
    updateItemColors: (state) => {
      const updatedItems = state.todos.map((item) => ({
        ...item,
        color: moment(item.dateTime).isBefore(moment())
          ? "red-dot"
          : "purple-dot",
      }));
      state.todos = [...updatedItems];
    },
    toggleTodo: (state, action: PayloadAction<number>) => {
      state.todos.filter((item) => {
        if (item.id === action.payload) {
          item.completed = !item.completed;
          item.color = moment(item.dateTime).isBefore(moment())
            ? "red-dot"
            : "purple-dot";
        }
      });
    },
  },
});
export const { addTodo, toggleTodo, updateItemColors } = todoSlice.actions;
export default todoSlice.reducer;
