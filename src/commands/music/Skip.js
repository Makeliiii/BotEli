import { Command } from 'discord-akairo'

export default class Skip extends Command {
    constructor() {
        super('skip', {
            aliases: ['skip', 'skippaa'],
            ratelimit: 1,
            category: 'music',
            description: 'Skip the current song.',
        })
    }

    exec(msg) {
        const { channel } = msg.member.voice
        const serverQue = msg.client.queue.get(msg.guild.id)

        if (!channel) return msg.channel.send('You must be in a voice channel to play music!')
        if (!serverQue) return msg.channel.send('There is nothing playing...')

        serverQue.connection.dispatcher.end('Skip has been used!')
    }
}