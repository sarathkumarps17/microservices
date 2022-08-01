import { Post } from "../../types/types";

export interface PostsState{
    posts:Post[];
    loading:boolean;
    error?:string;
    
}