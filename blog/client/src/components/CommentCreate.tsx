import React, { useState, SyntheticEvent } from "react";
import axios from "axios";
import { PostId } from "../types/types";
import { useAppDispatch } from "../app/storeHooks";
import { fetchPosts } from "../app/fetaures/postAPI";

const CommentCreate = ({ postId }: PostId) => {
  const [comment, setComment] = useState("");
  const dispatch = useAppDispatch();

  const onSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();

    await axios.post(`http://localhost:8081/posts/${postId}/comments`, {
      comment,
    });
    dispatch(fetchPosts());
    setComment("");
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>New Comment</label>
          <input
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="form-control"
          />
        </div>
        <button className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default CommentCreate;
