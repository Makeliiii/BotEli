import { Command } from 'discord-akairo'
import { MessageEmbed } from 'discord.js'
import { capitalize } from '../../utils/tools'
import { getPokeAPI } from '../../utils/pokeAPI'

export default class PokemonAbility extends Command {
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

    async exec(msg, args) {
        if (!args.name) {
            return msg.channel.send('Please provide correct arguments!')
        }

        await getPokeAPI(args.name, 'ability')
            .then(ability => {
                const { id, name, effect_entries, flavor_text_entries } = ability
    
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
            .catch(err => {
                return msg.channel.send(`Server responded with a status code of ${err.statusCode} and with message: ${err.statusMessage}`)
            })
    }
}