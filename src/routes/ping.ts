import { Router } from "express"
import { rooms, usernames, waitList } from "./waitlist.js"
import { Game } from "../Game.js"

export default Router().get('/:id/:username', (req, res) => {
    if (!req.params.id) {
        const user = waitList.find(u => u.username == req.params.username)
        if (user) {
            user.lastPing = Date.now()
            res.send()
        } else {
            for (const id in rooms) {
                if (rooms[id].users.find(u => u.username == req.params.username)) {
                    res.send(id)
                } else {
                    res.status(404).send()
                }
            }
        }
    } else {
        let check = Game.getRoomUser(req.params.id, req.params.username)
        if (check) {
            const { user } = check
            user.lastPing = Date.now()
            res.send()
        } else {
            res.status(404).send()
        }
    }
})

setInterval(() => {
    for (const room in rooms) {
        for (const user of rooms[room].users) {
            if (Date.now() - user.lastPing < 2000) {
                user.lastPing = Date.now()
            } else {
                rooms[room].users.splice(rooms[room].users.indexOf(user), 1)
                usernames.splice(usernames.indexOf(user.username), 1)
            }
        }
    }

    for (const user of waitList) {
        if (Date.now() - user.lastPing < 2000) {
            user.lastPing = Date.now()
        } else {
            waitList.splice(waitList.indexOf(user), 1)
            usernames.splice(usernames.indexOf(user.username), 1)
        }
    }
}, 1000)