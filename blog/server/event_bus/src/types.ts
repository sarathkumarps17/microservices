import {Response,Request} from 'express';
export enum Status{
    pending = 'PENDING',
    approved = 'APPROVED',
    rejected = 'REJECTED'
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