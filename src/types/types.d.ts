type Rooms = {
    [id: string]: import('../Game.ts').Game
}

type User = {
    username: string
    rank: number
    lastPing: number
    roomId?: string
    tableCards?: TableCards
    cemeteryCards?: Card[]
    life?: number
    turnEnded?: boolean
    replayEnded?: boolean
}

type Card = {
    name: string
    attack?: number
    life?: number
    speed?: 1 | 2 | 3
    sacrifices?: 1 | 2 | 3
}

type TableCards = [Card, Card, Card]

type Action = {
    type: string
    card: Card
    username: string //na maioria das vezes é o dono da carta
    pos: -1 | 0 | 1 | 2
    value?: number | number[]
    min?: number
    max?: number
}

type TurnEndBody = {
    cemeteryCards: Card[]
    tableCards: TableCards
    life: number
}