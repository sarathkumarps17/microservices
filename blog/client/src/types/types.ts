export interface PostId{postId:string};
export enum Status{
    pending = 'PENDING',
    approved = 'APPROVED',
    rejected = 'REJECTED'
}
export interface Comment{
    commentId:string;
    content:string;
    status?:Status
}
export interface CommnetsArray{
    comments:Comment[]
}
export interface Post{
    id:string;
    comments:Comment[];
    title:string
}