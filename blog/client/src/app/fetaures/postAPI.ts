import axios, { AxiosResponse } from "axios";
import { Post } from "../../types/types";
import {createAsyncThunk} from '@reduxjs/toolkit'
const postURL = 'http://localhost:8080/posts';
const queryURL = 'http://localhost:8082/posts';

export const  fetchPosts = createAsyncThunk('fetchPosts',async()=>{
    const res:AxiosResponse<Post[]> = await axios.get(queryURL);
    return res.data
});
