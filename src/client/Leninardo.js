import { AkairoClient, CommandHandler, ListenerHandler } from 'discord-akairo'
import { join } from 'path'
import JishoApi from 'unofficial-jisho-api'

export default class LeninardoClient extends AkairoClient {
    constructor(ownerID, token) {
        super({ ownerID })
        this.token = token
        this.jisho = new JishoApi()
    }

    commandHandler = new CommandHandler(this, {
        directory: join(__dirname, '..', 'commands'),
        prefix: '!',
        defaultCooldown: 1000
    })

    listenerHandler = new ListenerHandler(this, { directory: join(__dirname, '..', 'listeners') })

    init() {
        this.commandHandler.useListenerHandler(this.listenerHandler)

        this.commandHandler.loadAll()
        this.listenerHandler.loadAll()
        
        this.queue = new Map()
    }

    start() {
        this.init()
        return this.login(this.token)
    }
}