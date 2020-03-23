const { AkairoClient, CommandHandler, ListenerHandler } = require('discord-akairo')

require('dotenv').config()
const ownerID = process.env.ownerID
const token = process.env.TOKEN

class Client extends AkairoClient {
    constructor() {
        super({
            ownerID: ownerID
        })

        this.commandHandler = new CommandHandler(this, {
            directory: './commands',
            prefix: '!'
        })

        this.listenerHandler = new ListenerHandler(this, {
            directory: './listeners'
        })

        this.commandHandler.loadAll()

        this.commandHandler.useListenerHandler(this.listenerHandler)
        this.listenerHandler.loadAll()
    }
}

const client = new Client()
client.login(token)