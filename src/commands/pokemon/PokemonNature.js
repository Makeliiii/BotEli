import { Command } from 'discord-akairo'
import { MessageEmbed } from 'discord.js'
import { capitalize } from '../../utils/tools'
import { getPokeAPI } from '../../utils/pokeAPI'

export default class PokemonNature extends Command {
    constructor() {
        super('pokemonnature', {
            aliases: ['nature', 'pokemonnature'],
            cooldown: 10000,
            ratelimit: 1,
            category: 'pokemon',
            description: 'Returns info on a nature.',
            args: [
                {
                    id: 'name',
                    type: 'lowercase',
                }
            ]
        })
    }

    async exec(msg, args) {
        if (!args.name) {
            return msg.channel.send('Please provide correct arguments!')
        }

        await getPokeAPI(args.name, 'nature')
            .then(nature => {
                const { name, id, increased_stat, decreased_stat, likes_flavor, hates_flavor } = nature

                const embed = new MessageEmbed()
                    .setTitle(capitalize(name))
                    .addField('**ID**', id)
                    .addField('**Increased Stat**', !increased_stat ? 'None' : capitalize(increased_stat.name))
                    .addField('**Decreased Stat**', !decreased_stat ? 'None' : capitalize(decreased_stat.name))
                    .addField('**Likes Flavor**', !likes_flavor ? 'None' : capitalize(likes_flavor.name))
                    .addField('**Hates Flavor**', !hates_flavor ? 'None' : capitalize(hates_flavor.name))
                    .setTimestamp(new Date())
                    .setFooter('Leninardo')

                return msg.channel.send(embed)
            })
            .catch(err => {
                return msg.channel.send(`Server responded with a status code of ${err.statusCode} and with message: ${err.statusMessage}`)
            })
    }
}