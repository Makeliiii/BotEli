import { Command } from 'discord-akairo'
import { player } from '../../index'

export default class Stop extends Command {
    constructor() {
        super('stop', {
            aliases: ['stop', 'lopeta'],
            ratelimit: 1,
            category: 'music',
            description: 'Stop playing the current song.',
        })
    }

    async exec(msg) {
        await player.stop(msg.guild.id)
            .then(song => {
                return msg.channel.send(`Song ${song.name} stopped!`)
            })
            /*.catch(() => {
                return msg.channel.send('Something went wrong!')
            })*/
    }
}