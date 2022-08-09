import { randomBytes } from 'crypto';
import express,{Request,Response,Express} from 'express';
import bodyParser from 'body-parser';
import cors from 'cors'
import { EventData, EventType, Posts } from './Types';
import axios from 'axios';
const PORT = 8080;

const app:Express = express();
app.use(bodyParser.json());
app.use(cors())
const posts:Posts[] = [];
app.get('/posts',(req:Request,res:Response)=>{
    return res.status(200).json({posts})
});

app.post('/posts/create',(req:Request,res:Response)=>{
    const id = randomBytes(4).toString('hex');
    const {title} = req.body;
    posts.push({id,title});
    const post = posts.filter(post=>post.id===id)[0];
    const evnetData:EventData = {type:EventType.postCreated,payload:{id,data:title} }
    axios.post('http://event-bus-srv:8085/events',evnetData).catch(err=>console.log('emitting post event failed'))
    return res.status(200).json({post})
});
app.post('/events',(req:Request,res:Response)=>{
    console.log('event post created')
    res.status(200);
})
app.listen(PORT,()=>{
    console.log(`Post service running on PORT ${PORT}`)
})

