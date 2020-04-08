import { AkairoClient, CommandHandler, ListenerHandler } from 'discord-akairo'
import dotenv from 'dotenv'

dotenv.config()
const ownerID = process.env.ownerID
const token = process.env.TOKEN

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
client.login(token)