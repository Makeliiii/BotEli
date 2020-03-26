const { Command } = require('discord-akairo')
const { getPokemon } = require('../../helpers/pokeapi/poke')

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
                author: {
                    name: 'Leninardo',
                    icon_url: 'https://cdn.discordapp.com/app-icons/685546965618130997/5f9a74df2972c86ddb3c805e4e578fca.png',
                    url: 'https://github.com/Makeliiii/Leninardo'
                },
                fields: [
                    {
                        name: '**ID**',
                        value: id,
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
                        name: '**Types**',
                        ...(types.length === 2 ? { value: `${capitalize(types[0].type.name)}/${capitalize(types[1].type.name)}` }
                                               : { value: `${capitalize(types[0].type.name)}` }),
                        inline: true
                    },
                    {
                        name: '**Ability**',
                        ...(abilities.length === 3 ? { value: `${capitalize(abilities[0].ability.name)} (Hidden)/${capitalize(abilities[1].ability.name)}/${capitalize(abilities[2].ability.name)}` }
                                                   : abilities.length === 2 ? { value: `${capitalize(abilities[0].ability.name)} (Hidden)/${capitalize(abilities[1].ability.name)}` }
                                                   : { value: `${capitalize(abilities[0].ability.name)}` }),
                        inline: true
                    },
                    {
                        name: '**Base XP**',
                        value: `${base_experience}`,
                        inline: true
                    },
                    {
                        name: '**Stats**',
                        value: `https://bulbapedia.bulbagarden.net/wiki/${capitalize(name)}#Stats`,
                        inline: true
                    },
                    /*{
                        name: '\u200B',
                        value: `\u200B`
                    },
                    {
                        name: 'Stats',
                        value: `${capitalize(stats[0].stat.name)}
                                ${capitalize(stats[1].stat.name)}
                                ${capitalize(stats[2].stat.name)}
                                ${capitalize(stats[3].stat.name)}
                                ${capitalize(stats[4].stat.name)}
                                ${capitalize(stats[5].stat.name)}`,
                        inline: true
                    },
                    {
                        name: 'Value',
                        value: `${stats[0].base_stat}
                                ${stats[1].base_stat}
                                ${stats[2].base_stat}
                                ${stats[3].base_stat}
                                ${stats[4].base_stat}
                                ${stats[5].base_stat}`,
                        inline: true
                    },*/
                ],
                thumbnail: {
                    url: sprites.front_default
                }
            }

            return msg.channel.send({ embed })
        })
    }
}