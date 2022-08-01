import { createSlice } from "@reduxjs/toolkit";
import { fetchPosts } from "./postAPI";
import { PostsState } from "./types";

const initialState:PostsState = {posts:[],loading:false,error:''}

const postSlice = createSlice({name:'postData',initialState,reducers:{},
extraReducers:(builder)=>{
    builder.addCase(fetchPosts.fulfilled,(state,action)=>{
        state.error = '';
        state.loading = false;
        state.posts = action.payload
    });
    builder.addCase(fetchPosts.pending,(state)=>{
        state.loading = true;
        state.posts = [];
        state.error = '';
    });
    builder.addCase(fetchPosts.rejected,(state,action)=>{
        state.loading = false;
        state.posts = [];
        state.error = action.error.message || 'error';
    })
}});

export const postReducer = postSlice.reducer;
export const postActions = postSlice.actions;