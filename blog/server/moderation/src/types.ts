import { Request,Response } from "express";

export enum EventType{
    postCreated = 'POST_CREATED',
    commnetCreated = 'COMMENT_CREATED',
    commnetUpdated = 'COMMENT_UPDATED',
    commentModerated = 'COMMENT_MODERATED'
}
export enum Status{
    pending = 'PENDING',
    approved = 'APPROVED',
    rejected = 'REJECTED'
}
export interface EventData{
    type:EventType;
    payload:{
        id:string,
        postId?:string,
        data:string,
        status?:Status
    }
};
export interface Event extends Request{
    body:EventData
};

