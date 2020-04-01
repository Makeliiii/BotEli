const { Command } = require('discord-akairo')
const { MessageEmbed } = require('discord.js')

module.exports = class HelpCommand extends Command {
    constructor() {
        super('help', {
            aliases: ['help'],
            category: 'util',
            args: [
                {
                    id: 'command',
                    type: 'commandAlias'
                }
            ]
        })
    }

    exec(msg, args) {
        if (!args.command) {
            const embed = new MessageEmbed().addField(
                '**❯ Commands**',
                `A list of available commands.
                For additional info on a command, type \`${this.handler.prefix}help <command>\`
                `,
            )

            for (const category of this.handler.categories.values()) {
                embed.addField()
            }

            return msg.channel.send(embed)
        }
    }
}