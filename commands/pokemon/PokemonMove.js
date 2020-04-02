const { Command } = require('discord-akairo')
const { getPokeAPI } = require('../../utils/pokeAPI')
const { capitalize, capitalizeWords } = require('../../utils/tools')

module.exports = class PokemonMoves extends Command {
    constructor() {
        super('pokemonmoves', {
            aliases: ['move', 'pokemonmove'],
            cooldown: 10000,
            ratelimit: 1,
            category: 'pokemon',
            description: 'Returns info on a move.',
            args: [
                {
                    id: 'name',
                    type: 'lowercase',
                    match: 'content'
                }
            ]
        })
    }

    exec(msg, args) {
        if (!args.name) {
            return msg.channel.send('Please provide correct arguments!')
        }

        const id = args.name.replace(/ /gi, '-')
        
        getPokeAPI(id, 'move', (res) => {
            const { id, name, accuracy, power, pp, stat_changes, effect_entries, effect_chance, flavor_text_entries, type, statusCode } = res

            if (statusCode === 404) {
                return msg.channel.send('Move not found!')
            }

            const embed = {
                title: capitalizeWords(name),
                fields: [
                    {
                        name: '**Description**',
                        value: flavor_text_entries[2].flavor_text,
                        inline: true
                    },
                    {
                        name: '**Effect**',
                        ...(effect_entries[0].effect.includes('$effect_chance%') ? { value: effect_entries[0].effect.replace(/\$effect_chance/gi, effect_chance) } : { value: effect_entries[0].effect })
                    },
                    {
                        name: '**ID**',
                        value: id,
                        inline: true
                    },
                    {
                        name: '**Accuracy**',
                        ...(accuracy === null ? { value: '—' } : { value: `${accuracy}%` }),
                        inline: true
                    },
                    {
                        name: '**Power**',
                        ...(power === null ? { value: '—' } : { value: `${power}` }),
                        inline: true
                    },
                    {
                        name: '**PP**',
                        value: pp,
                        inline: true
                    },
                    {
                        name: '**Type**',
                        value: capitalize(type.name),
                        inline: true
                    },
                    {
                        name: '**Stat changes**',
                        ...(!Array.isArray(stat_changes) || !stat_changes.length ? { value: 'None' } : { value: stat_changes.map(stat => {
                            return (
                                `${stat.change} ${capitalize(stat.stat.name)}`
                            )
                        })}),
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