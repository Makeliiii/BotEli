import { Command } from 'discord-akairo'

module.exports = class PingCommand extends Command {
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