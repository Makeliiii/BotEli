const { Command } = require('discord-akairo')

module.exports = class AvatarCommand extends Command {
    constructor() {
        super('avatar', {
            aliases: ['avatar'],
            args: [
                {
                    id: 'format',
                    type: 'string',
                    default: 'jpg'
                },
                {
                    id: 'size',
                    type: 'number',
                    default: 128
                }
            ]
        })
    }

    exec(msg, args) {
        let avatarOPTS = {
            format: args.format,
            dynamic: true,
            size: args.size
        }

        let avatar = msg.author.displayAvatarURL(avatarOPTS)

        return msg.reply(`your avatar ${avatar}`)
    }
}