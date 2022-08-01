

import {Response,Request} from 'express';
import { Send } from 'express-serve-static-core';
export enum Status{
    pending = 'PENDING',
    approved = 'APPROVED',
    rejected = 'REJECTED'
}
export type CommentType = {commentId:string,content:string,status?:Status};
export interface Post{
        id:string;
        title:string;
        comments:CommentType[]
    }
export interface PostResponse extends Response {
        json: Send<Post[], this>;
    }
   
export interface EventRequest extends Request {
       body:EventData
    }
    export enum EventType{
        postCreated = 'POST_CREATED',
        commnetCreated = 'COMMENT_CREATED',
        commnetUpdated = 'COMMENT_UPDATED',
        commentModerated = 'COMMENT_MODERATED'
    }
export interface Payload{
    id:string,
    postId?:string,
    data:string
    status?:Status
}
export interface EventData{
        type:EventType;
        payload:Payload}
    