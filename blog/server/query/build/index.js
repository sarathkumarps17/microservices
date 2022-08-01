"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const axios_1 = __importDefault(require("axios"));
const types_1 = require("./types");
const PORT = 8082;
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
const posts = [];
const handleEvent = (type, payload) => {
    switch (type) {
        case types_1.EventType.postCreated:
            posts.push({ id: payload.id, title: payload.data, comments: [] });
            break;
        case types_1.EventType.commnetCreated:
        case types_1.EventType.commnetUpdated:
            let index = posts.findIndex(post => post.id === payload.postId);
            if (index !== -1) {
                let commentIndex = posts[index].comments.findIndex(comment => comment.commentId === payload.id);
                if (commentIndex !== -1) {
                    posts[index].comments[commentIndex] = { commentId: payload.id, content: payload.data, status: payload.status };
                }
                else {
                    posts[index].comments.push({ commentId: payload.id, content: payload.data, status: payload.status });
                }
            }
            break;
        default:
            break;
    }
};
app.post('/events', (req, res) => {
    const { type, payload } = req.body;
    handleEvent(type, payload);
    // console.log(posts)
    res.status(200);
});
app.get('/posts', (req, res) => {
    console.log(posts);
    res.status(200).json(posts);
});
app.listen(PORT, () => {
    console.log(`query service is running on PORT ${PORT}`);
    axios_1.default.get('http://localhost:8085/events').then((res) => {
        res.data.map(event => {
            handleEvent(event.type, event.payload);
        });
    }).catch(err => console.log('event fetching failed'));
});
