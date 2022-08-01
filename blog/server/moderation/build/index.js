"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const axios_1 = __importDefault(require("axios"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const types_1 = require("./types");
const PORT = 8083;
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
app.post('/events', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    setTimeout(() => moderateEvent(), 10000);
    const moderateEvent = () => {
        const { type, payload } = req.body;
        // console.log(type,payload);
        let { id, data, postId, status } = payload;
        switch (type) {
            case types_1.EventType.commnetCreated:
                if (!data || data.includes('bad')) {
                    status = types_1.Status.rejected;
                }
                else {
                    status = types_1.Status.approved;
                }
                ;
                const eventData = {
                    type: types_1.EventType.commentModerated,
                    payload: {
                        id,
                        data,
                        postId,
                        status
                    }
                };
                axios_1.default.post('http://localhost:8085/events', eventData).catch(err => console.log('emitting commnet moderation event failed'));
                break;
            default:
                break;
        }
        return res.status(200);
    };
}));
app.listen(PORT, () => console.log(`moderation service running on PORT ${PORT}`));
