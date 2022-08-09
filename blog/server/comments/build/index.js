"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const crypto_1 = require("crypto");
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const Types_1 = require("./Types");
const axios_1 = __importDefault(require("axios"));
const PORT = 8081;
const app = (0, express_1.default)();
const commentsByPostId = [];
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)());
app.get("/posts/:id/comments", (req, res) => {
    const postId = req.params.id;
    let postComments = commentsByPostId.filter(comments => comments.postId === postId);
    return res.status(200).json(postComments);
});
app.post("/posts/:id/comments", (req, res) => {
    const postId = req.params.id;
    const commentId = (0, crypto_1.randomBytes)(4).toString('hex');
    const { comment } = req.body;
    // console.log(comment)
    const commentByPostId = { postId, comment: { commentId, content: comment } };
    commentsByPostId.push(commentByPostId);
    const eventData = { type: Types_1.EventType.commnetCreated, payload: {
            id: commentId,
            postId,
            data: comment,
            status: Types_1.Status.pending
        } };
    // axios.post('http://event-bus-srv:8085/events',eventData).catch(err=>console.log('emitting commnet created event failed'));
    // return res.status(200).json(commentByPostId)
});
app.post('/events', (req, res) => {
    const { type, payload } = req.body;
    switch (type) {
        case Types_1.EventType.commentModerated:
            const eventData = {
                type: Types_1.EventType.commnetUpdated,
                payload
            };
            axios_1.default.post('http://event-bus-srv:8085/events', eventData).catch(err => console.log('emitting commnet moderation event failed'));
            break;
        default:
            break;
    }
    return res.status(200);
});
app.listen(PORT, () => console.log(`comments service running on PORT ${PORT}`));
