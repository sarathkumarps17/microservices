import express,{Express,Request,Response} from 'express';
import axios from 'axios';
import bodyParser from 'body-parser';
import { Event, EventData } from './types';

const BaseUrl = 'http://localhost:';
const PORT = 8085;

const app:Express = express();

app.use(bodyParser.json());

const events:EventData[] = [];

app.post('/events',(req:Event,res:Response)=>{

    const event = req.body;
    events.push(event);
    axios.post(`${BaseUrl}8080/events`,event).catch(err=>console.log('Post service event reception failed!'));
    axios.post(`${BaseUrl}8081/events`,event).catch(err=>console.log('Comment service event reception failed!'));
    axios.post(`${BaseUrl}8082/events`,event).catch(err=>console.log('Query service event reception failed!'));
    axios.post(`${BaseUrl}8083/events`,event).catch(err=>console.log('Moderaton service event reception failed!'));
    return res.status(200);
    
});
app.get('/events',(req:Request,res:Response)=>{
    res.status(200).json(events)
})

app.listen(PORT,()=>{
    console.log(`event bus is listning on PORT ${PORT}`);
});



