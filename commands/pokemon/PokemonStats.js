const { Command } = require('discord-akairo')
const { getPokeAPI } = require('../../utils/pokeAPI')
const { capitalize } = require('../../utils/tools')

module.exports = class PokemonStats extends Command {
    constructor() {
        super('pokemonstats', {
            aliases: ['stats', 'pokemonstats'],
            cooldown: 10000,
            ratelimit: 1,
            args: [
                {
                    id: 'name',
                    type: 'lowercase'
                }
            ]
        })
    }

    exec(msg, args) {
        if (args.name === null) {
            return msg.channel.send('Please provide correct arguments!')
        }

        getPokeAPI(args.name, 'pokemon', (res) => {
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
                    ...(stats.map(stat => {
                        return {
                            name: `**${capitalize(stat.stat.name)}**`,
                            value: stat.base_stat,
                            inline: true
                        }
                    }))
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