import React from "react";
import PostCreate from "./components/PostCreate";
import PostList from "./components/PostList";
import { Provider } from "react-redux";
import store from "./app/store";
const App = () => {
  return (
    <Provider store={store}>
      <div className="container">
        <h1>Create Post</h1>
        <PostCreate />
        <hr />
        <h1>Posts</h1>
        <PostList />
      </div>
    </Provider>
  );
};
export default App;
