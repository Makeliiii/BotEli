import { Command } from 'discord-akairo'

export default class Resume extends Command {
    constructor() {
        super('resume', {
            aliases: ['resume', 'jatka'],
            ratelimit: 1,
            category: 'music',
            description: 'Resume the current song.',
        })
    }

    exec(msg) {
        const { channel } = msg.member.voice
        const serverQue = msg.client.queue.get(msg.guild.id)

        if (!channel) return msg.channel.send('You must be in a voice channel to play music!')
        if (!serverQue) return msg.channel.send('There is nothing playing...')

        serverQue.connection.dispatcher.resume('Resume has been used!')

        return msg.channel.send(`Resumed **${serverQue.songs[0].title}**`)
    }
}