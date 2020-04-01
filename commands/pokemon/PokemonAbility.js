const { Command } = require('discord-akairo')
const { getPokeAPI } = require('../../utils/pokeAPI')
const { capitalize } = require('../../utils/tools')

module.exports = class PokemonAbility extends Command {
    constructor() {
        super('pokemonability', {
            aliases: ['ability', 'pokemonability'],
            cooldown: 10000,
            ratelimit: 1,
            category: 'pokemon',
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

            const embed = {
                title: capitalize(name),
                fields: [
                    {
                        name: '**ID**',
                        value: id
                    },
                    {
                        name: '**Description**',
                        value: flavor_text_entries[2].flavor_text
                    },
                    {
                        name: '**Effect**',
                        ...(effect_entries[0].effect.includes('$effect_chance%') ? { value: effect_entries[0].effect.replace(/\$effect_chance/gi, effect_chance) } : { value: effect_entries[0].effect })
                    }
                ]
            }

            return msg.channel.send({ embed })
        })
    }
}