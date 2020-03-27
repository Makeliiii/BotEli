const { Command } = require('discord-akairo')
const { getMove } = require('../../helpers/pokeapi/pokemon')
const { capitalize, capitalizeWords } = require('../../helpers/tools/tools')

module.exports = class PokemonMoves extends Command {
    constructor() {
        super('pokemonmoves', {
            cooldown: 10000,
            ratelimit: 1,
            aliases: ['pokemonmove', 'move'],
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
        if (args.name === null) {
            return msg.channel.send('Please provide correct arguments!')
        }

        let id = args.name.replace(/ /gi, '-')
        
        getMove(id, (res) => {
            const { id, name, accuracy, power, pp, stat_changes, effect_entries, effect_chance, type, statusCode } = res

            if (statusCode === 404) {
                return msg.channel.send('Move not found!')
            }

            const embed = {
                title: capitalizeWords(name),
                ...(effect_entries[0].effect.includes('$effect_chance%') ? { description: effect_entries[0].effect.replace(/\$effect_chance/gi, effect_chance) } : { description: effect_entries[0].effect }),
                fields: [
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
                        ...(!Array.isArray(stat_changes) ? { value: 'None' } : { value: stat_changes.map(stat => {
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