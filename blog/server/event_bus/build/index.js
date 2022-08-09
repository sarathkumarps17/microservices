"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const axios_1 = __importDefault(require("axios"));
const body_parser_1 = __importDefault(require("body-parser"));
const BaseUrl = 'http://localhost:';
const PORT = 8085;
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
const events = [];
app.post('/events', (req, res) => {
    const event = req.body;
    events.push(event);
    axios_1.default.post(`http://posts-clusterip-srv:8080/events`, event).catch(err => console.log('Post service event reception failed!'));
    axios_1.default.post(`http://comments-clusterip-srv:8081/events`, event).catch(err => console.log('Comment service event reception failed!'));
    axios_1.default.post(`http://query-clusterip-srv:8082/events`, event).catch(err => console.log('Query service event reception failed!'));
    axios_1.default.post(`http://moderation-clusterip-srv:8083/events`, event).catch(err => console.log('Moderaton service event reception failed!'));
    return res.status(200);
});
app.get('/events', (req, res) => {
    res.status(200).json(events);
});
app.listen(PORT, () => {
    console.log(`event bus is listning on PORT ${PORT}`);
});
