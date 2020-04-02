const { Command } = require('discord-akairo')

module.exports = class AvatarCommand extends Command {
    constructor() {
        super('avatar', {
            aliases: ['avatar'],
            category: 'util',
            description: 'Get your avatar',
            args: [
                {
                    id: 'size',
                    type: 'number',
                    default: 128
                }
            ]
        })
    }

    exec(msg, args) {
        if (args.size % 16 != 0 || args.size > 2049) {
            return msg.reply(`that's not a valid image size.`)
        }

        let avatarOPTS = {
            format: 'png',
            dynamic: true,
            size: args.size
        }

        let avatar = msg.author.displayAvatarURL(avatarOPTS)

        return msg.reply(`your avatar ${avatar}`)
    }
}