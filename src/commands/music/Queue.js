import { Command } from 'discord-akairo'

export default class Queue extends Command {
    constructor() {
        super('queue', {
            aliases: ['queue', 'que', 'q'],
            ratelimit: 1,
            category: 'music',
            description: 'Get the songs currently in the queue.',
        })
    }

    exec(msg) {
        const serverQue = msg.client.queue.get(msg.guild.id)

        if (!serverQue) return msg.channel.send('There is nothing playing...')

        const songMap = serverQue.songs.map((song, index) => {
            return `\n${index + 1}. **${song.title}**`
        }).join('')

        return msg.channel.send(`Songs in the queue:\n${songMap}`)
    }
}