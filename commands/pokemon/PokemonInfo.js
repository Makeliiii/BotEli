const { Command } = require('discord-akairo')
const { getPokeAPI } = require('../../utils/pokeAPI')
const { capitalize } = require('../../utils/tools')

module.exports = class PokemonInfo extends Command {
    constructor() {
        super('pokemoninfo', {
            aliases: ['pokemon', 'pokemoninfo'],
            cooldown: 10000,
            ratelimit: 1,
            args: [
                {
                    id: 'name',
                    type: 'lowercase',
                }
            ]
        })
    }

    exec(msg, args) {
        if (args.name === null) {
            return msg.channel.send('Please provide correct arguments!')
        }
        
        getPokeAPI(args.name, 'pokemon', (res) => {
            const { name, id, height, weight, types, sprites, base_experience, abilities, statusCode } = res

            if (statusCode === 404) {
                return msg.channel.send('Pokemon not found!')
            }

            const embed = {
                title: capitalize(name),
                url: `https://bulbapedia.bulbagarden.net/wiki/${capitalize(name)}`,
                thumbnail: {
                    url: sprites.front_default
                },
                fields: [
                    {
                        name: '**ID**',
                        value: id,
                        inline: true
                    },
                    {
                        name: '**Types**',
                        ...({ value: types.map(type => {
                            return capitalize(type.type.name)
                        })}),
                        inline: true
                    },
                    {
                        name: '**Abilities**',
                        ...({ value: abilities.map(ability => {
                            if (ability.is_hidden) {
                                return `${capitalize(ability.ability.name)} (Hidden)`
                            }
                            return capitalize(ability.ability.name)
                        })}),
                        inline: true
                    },
                    {
                        name: '**Height**',
                        value: `${height / 10}m`,
                        inline: true
                    },
                    {
                        name: '**Weight**',
                        value: `${weight / 10}kg`,
                        inline: true
                    },
                    {
                        name: '**Base XP**',
                        value: `${base_experience}`,
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