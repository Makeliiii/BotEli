import { Command } from 'discord-akairo'

export default class PingCommand extends Command {
    constructor() {
        super('ping', {
            description: 'ping',
            aliases: ['ping']
        })
    }

    exec(msg) {
        return msg.reply('Pong!')
    }
}