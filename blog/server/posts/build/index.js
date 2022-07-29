"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = require("crypto");
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const PORT = 8080;
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
const posts = [];
app.get('/posts', (req, res) => {
    res.status(200).json({ posts });
});
app.post('/posts', (req, res) => {
    const id = (0, crypto_1.randomBytes)(4).toString('hex');
    const { title } = req.body;
    posts.push({ id, title, comments: [] });
    res.status(200).json({ posts });
});
app.listen(PORT, () => {
    console.log(`Post service running on PORT ${PORT}`);
});
