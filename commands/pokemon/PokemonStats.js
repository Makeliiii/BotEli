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
                    type: 'lowercase'
                }
            ]
        })
    }

    exec(msg, args) {
        if (args.name === null) {
            return msg.channel.send('Please provide correct arguments!')
        }

        let id = args.name

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