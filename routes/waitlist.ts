import { Router } from "express"
import { v4 } from "uuid"
import { Game } from "../Game.js"

export const rooms: Rooms = {}
export const waitList: User[] = []
export const usernames: string[] = []

export default Router().post('', (req, res) => {
    if (!usernames.find(u => u == req.body.username)) {
        const user: User = {
            username: req.body.username,
            rank: req.body.turn,
            lastPing: Date.now()
        }
        waitList.push(user)
        usernames.push(user.username)
        res.send()
    } else res.status(409).send()
})

setInterval(() => {
    for (const user of waitList) {
        let compatibles: User[] = waitList.filter(u => u.username != user.username)

        if (compatibles.length) {
            const compatible = compatibles.reduce((previous, current) => {
                return (Math.abs(current.rank - user.rank) < Math.abs(previous.rank - user.rank) ? current : previous)
            })

            waitList.splice(waitList.indexOf(user), 1)
            waitList.splice(waitList.indexOf(compatible), 1)

            let id = v4()
            rooms[id] = new Game(id, user, compatible)
        }
    }
}, 1000)