const { Command } = require('discord-akairo')
const { MessageEmbed } = require('discord.js')
const { getPokeAPI } = require('../../utils/pokeAPI')
const { capitalize } = require('../../utils/tools')

module.exports = class PokemonAbility extends Command {
    constructor() {
        super('pokemonability', {
            aliases: ['ability', 'pokemonability'],
            cooldown: 10000,
            ratelimit: 1,
            category: 'pokemon',
            description: 'Returns info on an ability.',
            args: [
                {
                    id: 'name',
                    type: 'lowercase'
                }
            ]
        })
    }

    exec(msg, args) {
        if (!args.name) {
            return msg.channel.send('Please provide correct arguments!')
        }

        getPokeAPI(args.name, 'ability', (res) => {
            const { id, name, effect_entries, flavor_text_entries, statusCode } = res

            if (statusCode === 404) {
                return msg.channel.send('Ability not found')
            }

            const embed = new MessageEmbed()
                .setTitle(capitalize(name))
                .addField('**ID**', id)
                .addField('**Description**', flavor_text_entries[2].flavor_text)
                .addField(
                    '**Effect**',
                    effect_entries[0].effect.includes('$effect_chance%') ? effect_entries[0].effect.replace(/\$effect_chance/gi, effect_chance) : effect_entries[0].effect
                )
                .setTimestamp(new Date())
                .setFooter('Leninardo')

            return msg.channel.send(embed)
        })
    }
}