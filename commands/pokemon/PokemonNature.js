const { Command } = require('discord-akairo')
const { getPokeAPI } = require('../../utils/pokeAPI')
const { capitalize } = require('../../utils/tools')

module.exports = class PokemonNature extends Command {
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

    exec(msg, args) {
        if (!args.name) {
            return msg.channel.send('Please provide correct arguments!')
        }

        console.log(args.name)

        getPokeAPI(args.name, 'nature', (res) => {
            const { name, id, increased_stat, decreased_stat, likes_flavor, hates_flavor } = res

            const embed = {
                title: capitalize(name),
                fields: [
                    {
                        name: '**ID**',
                        value: id,
                    },
                    {
                        name: '**Increased Stat**',
                        ...(increased_stat === null ? { value: 'None' } : { value: capitalize(increased_stat.name) }),
                    },
                    {
                        name: '**Decreased Stat**',
                        ...(decreased_stat === null ? { value: 'None' } : { value: capitalize(decreased_stat.name) }),
                    },
                    {
                        name: '**Likes Flavor**',
                        ...(likes_flavor === null ? { value: 'None' } : { value: capitalize(likes_flavor.name) }),
                    },
                    {
                        name: '**Hates Flavor**',
                        ...(hates_flavor === null ? { value: 'None' } : { value: capitalize(hates_flavor.name) }),
                    },
                ]
            }

            return msg.channel.send({ embed })
        })
    }
}