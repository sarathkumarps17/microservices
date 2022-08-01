import express,{Response} from 'express';
import axios from 'axios';
import cors from 'cors';
import bodyParser from 'body-parser';
import { Event, Status,EventType ,EventData} from './types';

const PORT = 8083

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.post('/events',async(req:Event,res:Response)=>{
    setTimeout(()=>moderateEvent(),10000);
    const moderateEvent = ()=>{
        const {type,payload} = req.body;
        // console.log(type,payload);
        let {id,data,postId,status} = payload;
        switch (type) {
            case EventType.commnetCreated:
                if(!data || data.includes('bad')){
                    status=Status.rejected;
                }else{
                    status=Status.approved
                };
                const eventData:EventData = {
                    type:EventType.commentModerated,
                    payload:{
                        id,
                        data,
                        postId,
                        status
                    }
                }
                axios.post('http://localhost:8085/events',eventData).catch(err=>console.log('emitting commnet moderation event failed'));
                break;
        
            default:
                break;
        }
     
    
        return res.status(200)
    }
    
});

app.listen(PORT,()=>console.log(`moderation service running on PORT ${PORT}`))