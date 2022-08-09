import axios, { AxiosResponse } from "axios";
import { Post } from "../../types/types";
import {createAsyncThunk} from '@reduxjs/toolkit'
const postURL = 'http://posts.com/posts';
// const queryURL = 'http://query.com/posts';

export const  fetchPosts = createAsyncThunk('fetchPosts',async()=>{
    const res:AxiosResponse<Post[]> = await axios.get(postURL);
    return res.data
});
