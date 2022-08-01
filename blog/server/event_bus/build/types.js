"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventType = exports.Status = void 0;
var Status;
(function (Status) {
    Status["pending"] = "PENDING";
    Status["approved"] = "APPROVED";
    Status["rejected"] = "REJECTED";
})(Status = exports.Status || (exports.Status = {}));
var EventType;
(function (EventType) {
    EventType["postCreated"] = "POST_CREATED";
    EventType["commnetCreated"] = "COMMENT_CREATED";
    EventType["commnetUpdated"] = "COMMENT_UPDATED";
    EventType["commentModerated"] = "COMMENT_MODERATED";
})(EventType = exports.EventType || (exports.EventType = {}));
;
;
