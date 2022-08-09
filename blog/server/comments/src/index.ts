import express,{Express,Request,Response} from 'express';
import { randomBytes } from 'crypto';
import bodyParser from 'body-parser';
import cors from 'cors';
import {CommnetRequest, CommentByPotsId,CommentResponse,CommentsResponse, EventData, EventType, Status, Event } from './Types';
import axios from 'axios';

const PORT = 8081
const app:Express = express();

const commentsByPostId:CommentByPotsId[] = [];

app.use(bodyParser.json());
app.use(cors());

app.get("/posts/:id/comments",(req:Request,res:CommentsResponse)=>{
    const postId = req.params.id;
    let postComments = commentsByPostId.filter(comments=>comments.postId===postId);
    
    return res.status(200).json(postComments)
});

app.post("/posts/:id/comments",(req:CommnetRequest,res:CommentResponse)=>{
    const postId = req.params.id;
    const commentId = randomBytes(4).toString('hex');
    const {comment} = req.body;
    // console.log(comment)
    const commentByPostId:CommentByPotsId= {postId,comment:{commentId,content:comment}}
    commentsByPostId.push(commentByPostId);
    const eventData:EventData = {type:EventType.commnetCreated,payload:{
        id:commentId,
        postId,
        data:comment,
        status:Status.pending
    }};
    // axios.post('http://event-bus-srv:8085/events',eventData).catch(err=>console.log('emitting commnet created event failed'));
    // return res.status(200).json(commentByPostId)

});
app.post('/events',(req:Event,res:Response)=>{
    const {type,payload} = req.body;
    switch (type) {
        case EventType.commentModerated:
            const eventData:EventData = {
                type:EventType.commnetUpdated,
                payload
            }
            axios.post('http://event-bus-srv:8085/events',eventData).catch(err=>console.log('emitting commnet moderation event failed'));
            break;
    
        default:
            break;
    }
    return res.status(200);
})

app.listen(PORT,()=>console.log(`comments service running on PORT ${PORT}`))