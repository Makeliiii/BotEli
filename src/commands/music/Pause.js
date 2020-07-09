import { Command } from 'discord-akairo'

export default class Pause extends Command {
    constructor() {
        super('pause', {
            aliases: ['pause', 'pauseta'],
            ratelimit: 1,
            category: 'music',
            description: 'Pause the current song.',
        })
    }

    exec(msg) {
        const { channel } = msg.member.voice
        const serverQue = msg.client.queue.get(msg.guild.id)

        if (!channel) return msg.channel.send('You must be in a voice channel to play music!')
        if (!serverQue) return msg.channel.send('There is nothing playing...')

        serverQue.connection.dispatcher.pause('Pause has been used!')

        return msg.channel.send(`Paused **${serverQue.songs[0].title}**`)
    }
}