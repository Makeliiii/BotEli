const { Command } = require('discord-akairo')
const { getPokemon } = require('../../helpers/pokeapi/pokemon')
const { capitalize } = require('../../helpers/tools/tools')

module.exports = class PokemonStats extends Command {
    constructor() {
        super('pokemonstats', {
            aliases: ['stats', 'pokemonstats'],
            cooldown: 10000,
            ratelimit: 1,
            args: [
                {
                    id: 'name',
                    type: 'string'
                }
            ]
        })
    }

    exec(msg, args) {
        if (args.name === null) {
            return msg.channel.send('Please provide correct arguments!')
        }

        let id = args.name.toLowerCase()

        getPokemon(id, (res) => {
            const { statusCode, stats, name, sprites } = res

            if (statusCode === 404) {
                return msg.channel.send('Pokemon not found!')
            }

            const embed = {
                title: `${capitalize(name)}'s Stats`,
                url: `https://bulbapedia.bulbagarden.net/wiki/${capitalize(name)}#Stats`,
                thumbnail: {
                    url: sprites.front_default
                },
                fields: [
                    {
                        name: `**${capitalize(stats[0].stat.name)}**`,
                        value: stats[0].base_stat,
                        inline: true
                    },
                    {
                        name: `**${capitalize(stats[1].stat.name)}**`,
                        value: stats[1].base_stat,
                        inline: true
                    },
                    {
                        name: `**${capitalize(stats[2].stat.name)}**`,
                        value: stats[2].base_stat,
                        inline: true
                    },
                    {
                        name: `**${capitalize(stats[3].stat.name)}**`,
                        value: stats[3].base_stat,
                        inline: true
                    },
                    {
                        name: `**${capitalize(stats[4].stat.name)}**`,
                        value: stats[4].base_stat,
                        inline: true
                    },
                    {
                        name: `**${capitalize(stats[5].stat.name)}**`,
                        value: stats[5].base_stat,
                        inline: true
                    },
                ],
                timestamp: new Date(),
                footer: {
                    text: 'Leninardo',
                },
            }

            return msg.channel.send({ embed })
        })
    }
}