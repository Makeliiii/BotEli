import { Command } from 'discord-akairo'
import { MessageEmbed } from 'discord.js'
import { capitalize } from '../../utils/tools'
import { getPokeAPI } from '../../utils/pokeAPI'

export default class PokemonStats extends Command {
    constructor() {
        super('pokemonstats', {
            aliases: ['stats', 'pokemonstats'],
            cooldown: 10000,
            ratelimit: 1,
            category: 'pokemon',
            description: 'Returns the stats of a specific pokemon.',
            args: [
                {
                    id: 'name',
                    type: 'lowercase'
                }
            ]
        })
    }

    async exec(msg, args) {
        if (!args.name) return msg.channel.send('Please provide correct arguments!')

        await getPokeAPI(args.name, 'pokemon')
            .then(pokemon => {
                const { stats, name, sprites } = pokemon

                const embed = new MessageEmbed()
                    .setTitle(`${capitalize(name)}'s Stats`)
                    .setThumbnail(sprites.front_default)
                    .setTimestamp(new Date())
                    .setFooter('Leninardo')

                for (let stat of stats) {
                    embed.addField(capitalize(stat.stat.name), stat.base_stat, true)
                }

                return msg.channel.send(embed)
            })
            .catch(err => {
                return msg.channel.send(`Server responded with a status code of ${err.statusCode} and with message: ${err.statusMessage}`)
            })
    }
}