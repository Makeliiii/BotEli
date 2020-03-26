const { Command } = require('discord-akairo')
const { getPokemon } = require('../../helpers/pokeapi/pokemon')
const { capitalize } = require('../../helpers/tools/tools')

module.exports = class PokemonInfo extends Command {
    constructor() {
        super('pokemon', {
            aliases: ['pokemon', 'pokemoninfo'],
            cooldown: 10000,
            ratelimit: 1,
            args: [
                {
                    id: 'name',
                    type: 'string',
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
                        ...(types.length === 2 ? { value: `${capitalize(types[0].type.name)},\n${capitalize(types[1].type.name)}` }
                                               : { value: `${capitalize(types[0].type.name)}` }),
                        inline: true
                    },
                    {
                        name: '**Ability**',
                        ...(abilities.length === 3 ? { value: `${capitalize(abilities[0].ability.name)} (Hidden),\n${capitalize(abilities[1].ability.name)},\n${capitalize(abilities[2].ability.name)}` }
                                                   : abilities.length === 2 ? { value: `${capitalize(abilities[0].ability.name)} (Hidden),\n${capitalize(abilities[1].ability.name)}` }
                                                                            : { value: `${capitalize(abilities[0].ability.name)}` }),
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