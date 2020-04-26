import { AkairoClient, CommandHandler, ListenerHandler } from 'discord-akairo'
import { Player } from 'discord-player'
import dotenv from 'dotenv'

dotenv.config()
const ownerID = process.env.ownerID
const token = process.env.TOKEN
const youtube = process.env.youtube

class Client extends AkairoClient {
    constructor() {
        super({
            ownerID: ownerID
        })

        this.commandHandler = new CommandHandler(this, {
            directory: __dirname + '/commands/',
            prefix: '!'
        })

        this.listenerHandler = new ListenerHandler(this, {
            directory: __dirname + '/listeners/'
        })

        this.commandHandler.loadAll()

        this.commandHandler.useListenerHandler(this.listenerHandler)
        this.listenerHandler.loadAll()
    }
}

const client = new Client()
const player = new Player(client, youtube)
client.player = player

client.login(token)