
import {Response,Request} from 'express';
import { Send } from 'express-serve-static-core';

export enum Status{
    pending = 'PENDING',
    approved = 'APPROVED',
    rejected = 'REJECTED'
}
export type CommentType = {commentId:string,content:string,status?:Status};

export interface CommentByPotsId{
    postId:string;
    comment:CommentType
}


export interface CommentResponse extends Response {
    json: Send<CommentByPotsId, this>;
 }
 export interface CommentsResponse extends Response {
    json: Send<CommentByPotsId[], this>;
 }
 export interface CommnetRequest extends Request {
    body: {comment:string}
}
export enum EventType{
    postCreated = 'POST_CREATED',
    commnetCreated = 'COMMENT_CREATED',
    commnetUpdated = 'COMMENT_UPDATED',
    commentModerated = 'COMMENT_MODERATED'
}
export interface EventData{
    type:EventType;
    payload:{
        id:string,
        postId:string,
        data:string,
        status?:Status
    }
};
export interface Event extends Request{
    body:EventData
};
