"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Status = exports.EventType = void 0;
var EventType;
(function (EventType) {
    EventType["postCreated"] = "POST_CREATED";
    EventType["commnetCreated"] = "COMMENT_CREATED";
    EventType["commnetUpdated"] = "COMMENT_UPDATED";
    EventType["commentModerated"] = "COMMENT_MODERATED";
})(EventType = exports.EventType || (exports.EventType = {}));
var Status;
(function (Status) {
    Status["pending"] = "PENDING";
    Status["approved"] = "APPROVED";
    Status["rejected"] = "REJECTED";
})(Status = exports.Status || (exports.Status = {}));
;
;
