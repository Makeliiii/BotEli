import { Command } from 'discord-akairo'
import { MessageEmbed } from 'discord.js'
import { capitalize } from '../../utils/tools'
import { getPokeAPI } from '../../utils/pokeAPI'

export default class PokemonInfo extends Command {
    constructor() {
        super('pokemoninfo', {
            aliases: ['pokemon', 'pokemoninfo'],
            cooldown: 10000,
            ratelimit: 1,
            category: 'pokemon',
            description: 'Returns general info on a specific pokemon.',
            args: [
                {
                    id: 'name',
                    type: 'lowercase',
                }
            ]
        })
    }

    async exec(msg, args) {
        if (!args.name) return msg.channel.send('Please provide correct arguments!')

        await getPokeAPI(args.name, 'pokemon')
            .then(pokemon => {
                const { name, id, height, weight, types, sprites, base_experience, abilities } = pokemon

                const embed = new MessageEmbed()
                    .setTitle(capitalize(name))
                    .setURL(`https://bulbapedia.bulbagarden.net/wiki/${capitalize(name)}`)
                    .setThumbnail(sprites.front_default)
                    .addField('**ID**', id, true)
                    .addField(
                        '**Types**',
                        types.map(type => {
                            return capitalize(type.type.name)
                        }),
                        true
                    )
                    .addField(
                        '**Abilities**',
                        abilities.map(ability => {
                            if (ability.is_hidden) return `${capitalize(ability.ability.name)} (Hidden)`
                            
                            return capitalize(ability.ability.name)
                        }),
                        true
                    )
                    .addField('**Height**', `${height / 10}m`, true)
                    .addField('**Weight**', `${weight / 10}kg`, true)
                    .addField('**Base XP**', base_experience, true)
                    .setTimestamp(new Date())
                    .setFooter('Leninardo')

                return msg.channel.send(embed)
            })
            .catch(err => {
                return msg.channel.send(`Server responded with a status code of ${err.statusCode} and with message: ${err.statusMessage}`)
            })
    }
}