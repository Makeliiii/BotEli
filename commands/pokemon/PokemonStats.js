const { Command } = require('discord-akairo')
const { MessageEmbed } = require('discord.js')
const { getPokeAPI } = require('../../utils/pokeAPI')
const { capitalize } = require('../../utils/tools')

module.exports = class PokemonStats extends Command {
    constructor() {
        super('pokemonstats', {
            aliases: ['stats', 'pokemonstats'],
            cooldown: 10000,
            ratelimit: 1,
            category: 'pokemon',
            description: 'Returns the stats of a specific pokemon.',
            args: [
                {
                    id: 'name',
                    type: 'lowercase'
                }
            ]
        })
    }

    exec(msg, args) {
        if (!args.name) {
            return msg.channel.send('Please provide correct arguments!')
        }

        getPokeAPI(args.name, 'pokemon', (res) => {
            const { statusCode, stats, name, sprites } = res

            if (statusCode === 404) {
                return msg.channel.send('Pokemon not found!')
            }

            const embed = new MessageEmbed()
                .setTitle(`${capitalize(name)}'s Stats`)
                .setThumbnail(sprites.front_default)
                .setTimestamp(new Date())
                .setFooter('Leninardo')

            for (let stat of stats) {
                embed.addField(capitalize(stat.stat.name), stat.base_stat, true)
            }

            return msg.channel.send(embed)
        })
    }
}