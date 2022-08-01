export interface Posts{
    id:string
    title:string;
}

export enum EventType{
    postCreated = 'POST_CREATED',
    commnetCreated = 'COMMENT_CREATED'
}
export interface EventData{
    type:EventType;
    payload:{
        id:string,
        data:string
    }
}
