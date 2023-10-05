// App.tsx
import React from "react";
import Todo from "./component/Todo";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { todosReducer } from "./reducer/cartReducer";

const store = createStore(todosReducer);

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <div className="container">
          <Todo />
        </div>
      </div>
    </Provider>
  );
}

export default App;
