import { TodoItem } from "../action/Actions";

type Action = { type: "TOGGLE_TODO"; payload: { id: number } };

const initialState: TodoItem[] = [];

export const todosReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case "TOGGLE_TODO":
      return state.map((todo) =>
        todo.id === action.payload.id
          ? { ...todo, completed: !todo.completed }
          : todo
      );
    default:
      return state;
  }
};
