const { Command } = require('discord-akairo')
const { getPokemon } = require('../../helpers/pokeapi/poke')

module.exports = class PokemonInfo extends Command {
    constructor() {
        super('pokemon', {
            aliases: ['pokemon', 'pokemoninfo'],
            args: [
                {
                    id: 'name',
                    type: 'string',
                    default: 'mudkip'
                }
            ]
        })
    }

    exec(msg, args) {
        let name = args.name.toLowerCase()
        
        getPokemon(name, (res) => {
            return msg.reply(res.name)
        })
    }
}