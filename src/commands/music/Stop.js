import { Command } from 'discord-akairo'

export default class Stop extends Command {
    constructor() {
        super('stop', {
            aliases: ['stop', 'lopeta'],
            ratelimit: 1,
            category: 'music',
            description: 'Stop playing music.',
        })
    }

    exec(msg) {
        const { channel } = msg.member.voice
        const serverQue = msg.client.queue.get(msg.guild.id)

        if (!channel) return msg.channel.send('You must be in a voice channel to play music!')
        if (!serverQue) return msg.channel.send('There is nothing playing...')

        serverQue.songs = []
        serverQue.connection.dispatcher.end('Stop has been used!')

        return msg.channel.send(`Stopped playing music, queue has been cleared.`)
    }
}