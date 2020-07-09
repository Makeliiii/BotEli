import { Command } from 'discord-akairo'

export default class NowPlaying extends Command {
    constructor() {
        super('nowplaying', {
            aliases: ['np', 'nowplaying'],
            ratelimit: 1,
            category: 'music',
            description: 'Get the song currently playing.',
        })
    }

    exec(msg) {
        const serverQue = msg.client.queue.get(msg.guild.id)

        if (!serverQue) return msg.channel.send('There is nothing playing...')

        return msg.channel.send(`Now playing **${serverQue.songs[0].title}**`)
    }
}