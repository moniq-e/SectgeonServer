import ActionManager from "./ActionManager.js"
import { rooms } from "./routes/waitlist.js"

export class Game {
    public readonly ID: string
    public users: User[] = []
    public turn: number = 1
    public readonly actionManager = new ActionManager(this)

    constructor(id: string, ...users: User[]) {
        for (const user of users) {
            user.roomId = id
        }

        this.ID = id
        this.users = users
    }

    onTurnEnd(user: User, body: TurnEndBody) {
        user.turnEnded = true
        user.tableCards = body.tableCards
        user.cemeteryCards = body.cemeteryCards
        user.life = body.life
    }

    allTurnEnd(user?: User): boolean | Card[] {
        let ok = this.users.every(u => u.turnEnded)

        if (ok && user) {
            return this.users.find(u => u != user).tableCards
        }
        return ok
    }

    onReplayEnd(user: User) {
        user.replayEnded = true
    }

    allReplayEnd(): boolean {
        let ok = this.users.every(u => u.replayEnded)

        if (ok) {
            this.turn++
            this.actionManager.clear()

            for (const user of this.users) {
                user.replayEnded = false
                user.turnEnded = false
                user.tableCards = null
            }
        }
        return ok
    }

    static getRoomUser(id: string, username: string): { room: Game, user: User } | null {
        if (id && username) {
            let room = rooms[id]
            if (room) {
                let user = room.users.find(u => u.username == username)
                if (user) {
                    return { room, user }
                }
            }
        }
        return null
    }
}