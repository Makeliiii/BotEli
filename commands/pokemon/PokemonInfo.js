const { Command } = require('discord-akairo')
const { getPokemon } = require('../../helpers/pokeapi/pokemon')

module.exports = class PokemonInfo extends Command {
    constructor() {
        super('pokemon', {
            aliases: ['pokemon', 'pokemoninfo'],
            args: [
                {
                    id: 'name',
                    type: 'string',
                    default: 'mudkip'
                }
            ]
        })
    }

    exec(msg, args) {
        let id = args.name.toLowerCase()
        
        getPokemon(id, (res) => {
            if (res.statusCode === 404) {
                return msg.channel.send('Pokemon not found!')
            }

            const capitalize = function(string) {
                return string.charAt(0).toUpperCase() + string.slice(1)
            }

            const { stats, name, id, height, weight, types, sprites, base_experience, abilities } = res

            const embed = {
                title: capitalize(name),
                url: `https://bulbapedia.bulbagarden.net/wiki/${capitalize(name)}`,
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
                thumbnail: {
                    url: sprites.front_default
                },
                timestamp: new Date(),
                footer: {
                    text: 'Leninardo',
                },
            }

            return msg.channel.send({ embed })
        })
    }
}