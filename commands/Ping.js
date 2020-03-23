const { Command } = require('discord-akairo')

module.exports = class PingCommand extends Command {
    constructor() {
        super('ping', {
            aliases: ['ping']
        })
    }

    exec(msg) {
        return msg.reply('Pong!')
    }
}