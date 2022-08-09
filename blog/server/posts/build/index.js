"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = require("crypto");
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const Types_1 = require("./Types");
const axios_1 = __importDefault(require("axios"));
const PORT = 8080;
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)());
const posts = [];
app.get('/posts', (req, res) => {
    return res.status(200).json({ posts });
});
app.post('/posts/create', (req, res) => {
    const id = (0, crypto_1.randomBytes)(4).toString('hex');
    const { title } = req.body;
    posts.push({ id, title });
    const post = posts.filter(post => post.id === id)[0];
    const evnetData = { type: Types_1.EventType.postCreated, payload: { id, data: title } };
    axios_1.default.post('http://event-bus-srv:8085/events', evnetData).catch(err => console.log('emitting post event failed'));
    return res.status(200).json({ post });
});
app.post('/events', (req, res) => {
    console.log('event post created');
    res.status(200);
});
app.listen(PORT, () => {
    console.log(`Post service running on PORT ${PORT}`);
});
