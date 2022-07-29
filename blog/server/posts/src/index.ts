import { randomBytes } from 'crypto';
import express,{Request,Response,Express} from 'express';
import bodyParser from 'body-parser';
import cors from 'cors'
import { Posts } from './Types';
const PORT = 8080;

const app:Express = express();
app.use(cors())
app.use(bodyParser.json());
const posts:Posts[] = [];
app.get('/posts',(req:Request,res:Response)=>{
    res.status(200).json({posts})
});

app.post('/posts',(req:Request,res:Response)=>{
    const id = randomBytes(4).toString('hex');
    const {title} = req.body;
    posts.push({id,title,comments:[]});
    res.status(200).json({posts})
});

app.listen(PORT,()=>{
    console.log(`Post service running on PORT ${PORT}`)
})

