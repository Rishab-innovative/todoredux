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
    updateTodoList: (state, action: PayloadAction<TodoItem>) => {
      const { id, text, dateTime, completed } = action.payload;
      let listOfTodos = [...state.todos];
      listOfTodos.forEach((item) => {
        if (item.id === id) {
          item.text = text;
          item.dateTime = dateTime;
          item.completed = completed;
        }
        state.todos = [...listOfTodos];
      });
    },

    deleteTodo: (state, action: PayloadAction<number>) => {
      state.todos = state.todos.filter((item) => item.id !== action.payload);
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
export const { addTodo, toggleTodo, deleteTodo, updateTodoList } =
  todoSlice.actions;
export default todoSlice.reducer;
