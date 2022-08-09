import express,{Request,Response} from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import axios,{AxiosResponse} from 'axios'
import { EventData, EventRequest, EventType, Payload, Post, PostResponse } from './types';

const PORT = 8082;

const app = express();
app.use(bodyParser.json());
app.use(cors());

const posts:Post[] = [];

const handleEvent = (type:EventType,payload:Payload)=>{
    switch (type) {
        case EventType.postCreated:
            posts.push({id:payload.id,title:payload.data,comments:[]});
            break;
        case EventType.commnetCreated:
        case EventType.commnetUpdated:
            let index = posts.findIndex(post=>post.id===payload.postId);
            if(index!==-1){
                let commentIndex = posts[index].comments.findIndex(comment=>comment.commentId===payload.id);
                if(commentIndex!==-1){
                    posts[index].comments[commentIndex] = {commentId:payload.id,content:payload.data,status:payload.status}
                } else{
                    posts[index].comments.push({commentId:payload.id,content:payload.data,status:payload.status})
                }
            }
            break;         
        default:
            break;
    }
}
app.post('/events',(req:EventRequest,res:Response)=>{
    const {type,payload} = req.body;
    handleEvent(type,payload)
    res.status(200)
});

app.get('/posts',(req:Request,res:PostResponse)=>{
    res.status(200).json(posts)
});

app.listen(PORT,()=>{
    console.log(`query service is running on PORT ${PORT}`);
     axios.get('http://event-bus-srv:8085/events').then((res:AxiosResponse<EventData[]>)=>{
        res.data.map(event=>{
            handleEvent(event.type,event.payload);
        })
     }).catch(err=>console.log('event fetching failed'))
})

