import { Command } from 'discord-akairo'
import { MessageEmbed } from 'discord.js'
import { capitalize } from '../../utils/tools'

export default class HelpCommand extends Command {
    constructor() {
        super('help', {
            aliases: ['help'],
            category: 'util',
            description: 'Return all the commands or info on a specific command.',
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
                Type \`${this.handler.prefix}help <command>\` for more info on a specific command.`,
            )

            for (const category of this.handler.categories.values()) {
                embed.addField(
                    `**${capitalize(category.id)}**`,
                    category.map(command => {
                        return `\`${command.aliases[0]}\``
                    }).join(' ')
                )
            }

            return msg.channel.send(embed)
        }

        const embed = new MessageEmbed()
            .setTitle(`\`${capitalize(args.command.aliases[0])}\``)
            .addField('**❯ Description**', args.command.description || '\u200B')

        return msg.channel.send(embed)
    }
}