const { Command } = require('discord-akairo')
const { MessageEmbed } = require('discord.js')
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

            const embed = new MessageEmbed()
                .setTitle(capitalizeWords(name))
                .addField('**Description**', flavor_text_entries[2].flavor_text)
                .addField(
                    '**Effect**',
                    effect_entries[0].effect.includes('$effect_chance%') ? effect_entries[0].effect.replace(/\$effect_chance/gi, effect_chance) : effect_entries[0].effect,
                )
                .addField('**ID**', id, true)
                .addField('**Accuracy**', !accuracy ? '—' : accuracy, true)
                .addField('**Power**', !power ? '—' : power, true)
                .addField('**PP**', pp, true)
                .addField('**Type**', capitalize(type.name), true)
                .addField(
                    '**Stat Changes**',
                    !Array.isArray(stat_changes) || !stat_changes.length ? 'None' : stat_changes.map(stat => {
                        return `${stat.change} ${capitalize(stat.stat.name)}`
                    }),
                    true
                )
                .setTimestamp(new Date())
                .setFooter('Leninardo')

            return msg.channel.send(embed)
        })
    }
}