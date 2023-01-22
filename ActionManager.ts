import { Game } from "./Game.js"

export default class ActionManager {
    public readonly room: Game
    private actions: Action[] = []

    constructor(room: Game) {
        this.room = room
    }

    handleAction(action: Action): Action {
        const exists = this.findAction(action)
        if (exists) return exists

        switch (action.type) {
            case "randomEnemyAttack": {
                //posição da carta
                action.value = random(0, 2)

                this.actions.push(action)
                return action
            }
            case "randomCemeteryCard": {
                //de qual usuário é o cemitério em questão é em 'Action.username'
                const { cemeteryCards } = this.room.users.find(u => u.username == action.username)
                action.value = random(0, cemeteryCards.length - 1)

                this.actions.push(action)
                return action
            }
            case "randomValue": {
                action.value = random(action.min, action.max)

                this.actions.push(action)
                return action
            }
            default: return null
        }
    }

    findAction(action: Action) {
        return this.actions.find(a => a.type == action.type && a.card == action.card && a.username == action.username && a.pos == action.pos)
    }

    clear() {
        this.actions = []
    }
}

function random(min: number, max: number, int: boolean = true) {
    if (int) {
        return Math.floor((Math.random() * max) + min)
    } else {
        return Number(((Math.random() * max) + min).toFixed(2))
    }
}