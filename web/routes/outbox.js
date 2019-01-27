/**
* Outbox Routes
*
* API to manage queue for messages to be sent over long-range data radio
**/
const bodyParser = require('body-parser')
const util = require('../util')
const log = util.Logger
const message = require('../middleware/message')

module.exports = (serv) => {
    /**
    * List outbox messages queued for forward
    */
    serv.get('/api/outbox', (req, res) => {
        res.status(200).json({
            'messages': res.app.locals.outbox
        })
    })

    /**
    * Queue messages to forward to nearby devices
    */
    serv.put('/api/outbox', bodyParser.json(), message, (req, res) => {
        // @todo could sort these by sequence to attempt
        // to control order even when we have duplicate 1s, 2s, 3s...
        let msg = res.locals.message.text
        res.app.locals.outbox.push(msg)
        log.debug(`${util.logPrefix('outbox')} ${msg}`)
        res.status(201).json({ 'ok': true })
    })

    /**
    * Pull one item off the outbox queue
    */
    // @todo allow multi-message queue output
    // (e.g.fit as many messages as possible in 100 chars)
    serv.post('/api/outbox', (req, res) => {
        let msg = res.app.locals.outbox.shift() || null
        let data = {
            'message': msg,
            'rows': res.app.locals.outbox.length
        }

        if (msg) {
            log.debug(`${util.logPrefix('outbox')} release from queue: ${msg}`)
            res.status(201).json(data)
        } else {
            res.status(200).json(data)
        }
    })
}
