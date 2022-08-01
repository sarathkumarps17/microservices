import React, { useState, useEffect } from "react";
import axios, { AxiosResponse } from "axios";
import CommentCreate from "./CommentCreate";
import CommentList from "./CommentList";
import { Post } from "../types/types";
import { useAppSelector, useAppDispatch } from "../app/storeHooks";
import { fetchPosts } from "../app/fetaures/postAPI";
const PostList = () => {
  const posts = useAppSelector((state) => state.posts);
  const dispatch = useAppDispatch();

  // const fetchPosts = async () => {
  //   const res: AxiosResponse<Post[]> = await axios.get(
  //     "http://localhost:8082/posts"
  //   );

  //   setPosts(res.data);
  // };

  useEffect(() => {
    dispatch(fetchPosts());
  }, []);

  const renderedPosts = posts.map((post) => {
    return (
      <div
        className="card"
        style={{ width: "30%", marginBottom: "20px" }}
        key={post.id}
      >
        <div className="card-body">
          <h3>{post.title}</h3>
          <CommentList comments={post.comments} />
          <CommentCreate postId={post.id} />
        </div>
      </div>
    );
  });

  return (
    <div className="d-flex flex-row flex-wrap justify-content-between">
      {renderedPosts}
    </div>
  );
};

export default PostList;
