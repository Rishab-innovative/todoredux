import { ActionTypes } from './actionTypes';

export interface AddTodoAction {
  type: ActionTypes.ADD_TODO;
  payload: {
    text: string;
    dateTime: Date;
  };
}

export interface ToggleTodoAction {
  type: ActionTypes.TOGGLE_TODO;
  payload: {
    id: number;
  };
}

export type TodoAction = AddTodoAction | ToggleTodoAction;

export const addTodo = (text: string, dateTime: Date): AddTodoAction => ({
  type: ActionTypes.ADD_TODO,
  payload: {
    text,
    dateTime,
  },
});

export const toggleTodo = (id: number): ToggleTodoAction => ({
  type: ActionTypes.TOGGLE_TODO,
  payload: {
    id,
  },
});
