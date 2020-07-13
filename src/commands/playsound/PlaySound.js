import { Command } from 'discord-akairo'
import fs from 'fs'

export default class PlaySound extends Command {
    constructor() {
        super('playsound', {
            aliases: ['playsound', 'sound'],
            ratelimit: 1,
            category: 'playsound',
            description: 'Play a sound from the "database".',
            args: [
                {
                    id: 'name',
                    type: 'string',
                    match: 'content'
                }
            ]
        })
    }

    async exec(msg, args) {
        const { channel } = msg.member.voice
        const sound = `${__dirname}/../../../sounds/${args.name}.mp4`
        const serverQue = msg.client.queue.get(msg.guild.id)

        if (!channel) return msg.channel.send('You must join the voice channel to play a sound!')
        if (serverQue) return msg.channel.send(`Can't play sounds while there is music queued!`)

        const connection = await channel.join()
        const dispatcher = connection.play(fs.createReadStream(sound), { volume: 0.2 })
            .on('finish', () => {
                console.log(`${sound} has finished playing.`)
            })
            .on('error', error => console.log(error))
    }
}