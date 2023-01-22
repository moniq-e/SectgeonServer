import { Request, Router } from "express"
import { Game } from "../Game.js"

export default Router().post('/turnend/:id/:username', (req: Request<{ id: string, username: string }, any, TurnEndBody>, res) => {
    let check = Game.getRoomUser(req.params.id, req.params.username)
    if (check) {
        const { room, user } = check
        room.onTurnEnd(user, req.body)

        const interval = setInterval(() => {
            if (room.allTurnEnd()) {
                res.send(room.allTurnEnd(user))
                clearInterval(interval)
            }
        }, 1000)
    } else {
        res.status(404).send()
    }
}).get('/replayend/:id/:username', (req, res) => {
    let check = Game.getRoomUser(req.params.id, req.params.username)
    if (check) {
        const { room, user } = check
        room.onReplayEnd(user)

        const interval = setInterval(() => {
            if (room.allReplayEnd()) {
                res.send()
                clearInterval(interval)
            }
        }, 1000)
    } else {
        res.status(404).send()
    }
}).post('/action/:id/:username', (req, res) => {
    let check = Game.getRoomUser(req.params.id, req.params.username)
    if (check) {
        const { room } = check
        const resbody = room.actionManager.handleAction(req.body)

        if (resbody) {
            res.send(resbody)
        } else {
            res.status(404).send()
        }
    } else {
        res.status(404).send()
    }
})