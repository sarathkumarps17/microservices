import React, { useState, SyntheticEvent } from "react";
import axios from "axios";
import { useAppDispatch } from "../app/storeHooks";
import { fetchPosts } from "../app/fetaures/postAPI";
const PostCreate = () => {
  const [title, setTitle] = useState("");
  const dispatch = useAppDispatch();
  const onSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();

    await axios
      .post("http://posts.com/posts/create", {
        title,
      })
      .catch((e) => console.log("post creatiion failed"));
    dispatch(fetchPosts());
    setTitle("");
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Title</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="form-control"
          />
        </div>
        <button className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default PostCreate;
