"use strict"

const bodyParser = require("body-parser");
const util = require("../util");
const log = util.Logger;
const message = require("../middleware/message");

module.exports = (serv) => {

    /**
    * List outbox messages queued for forward
    */
    serv.get("/api/outbox", (req, res) => {

        res.status(200).json({
            "messages": res.app.locals.outbox
        });
    });

    /**
    * Queue messages to forward to nearby devices
    */
    serv.put("/api/outbox", message, (req, res) => {
        // @todo could sort these by sequence to attempt
        // to control order even when we have duplicate 1s, 2s, 3s...
        let msg = res.locals.message.text;
        res.app.locals.outbox.push(msg);
        res.status(200).json({"ok": true});
    }); 

    /**
    * Pull one item off the outbox queue
    */
    serv.post("/api/outbox", (req, res) => {
        let data = {
            "message": res.app.locals.outbox.shift(),
            "rows": res.app.locals.outbox.length
        }

        let msg = data.message;

        if (msg) {
            log.debug(" outbox << " + (msg[1] == "|" ? " " : "") + msg);
            res.status(201).json(data);
        }
        else {
            res.status(404).json(data);
        }
    });

};