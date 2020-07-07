import { Command } from 'discord-akairo'
import ytdl from 'ytdl-core'
import { search } from '../../utils/youtube'

export default class Play extends Command {
    constructor() {
        super('play', {
            aliases: ['play', '+', 'soita', 'p'],
            ratelimit: 1,
            category: 'music',
            description: 'Play a video from youtube.',
            args: [
                {
                    id: 'url',
                    type: 'string',
                    match: 'content'
                }
            ]
        })
    }

    async exec(msg, args) {
        const { channel } = msg.member.voice

        if (!args.url) {
            return msg.channel.send('Please provide an argument!')
        }

        if (!channel) {
            return msg.channel.send('You must be in a voice channel to play music!')
        }
        
        await search(args.url)
            .then(async video => {
                const url = `https://www.youtube.com/watch?v=${video.id}`

                const serverQue = msg.client.queue.get(msg.guild.id)
                const song = {
                    id: video.id,
                    title: video.title,
                    url: url
                }

                console.log(song)

                if (serverQue) {
                    serverQue.songs.push(song)
                    console.log(serverQue.songs)
                    return msg.channel.send(`**${song.title}** has been added to the queue!`)
                }
                
                const queueConstruct = {
                    tc: msg.channel,
                    vc: channel,
                    connection: null,
                    songs: [],
                    volume: 2,
                    playing: true
                }

                msg.client.queue.set(msg.guild.id, queueConstruct)
                queueConstruct.songs.push(song)

                const play = async song => {
                    const queue = msg.client.queue.get(msg.guild.id)

                    if (!song) {
                        queue.vc.leave()
                        msg.client.queue.delete(msg.guild.id)
                        return
                    }

                    const dispatcher = queue.connection.play(ytdl(song.url))
                        .on('finish', () => {
                            queue.songs.shift()
                            play(queue.songs[0])
                        })
                        .on('error', error => console.log(error))

                    dispatcher.setVolumeLogarithmic(queue.volume / 5)
                    queue.tc.send(`Started playing: **${song.title}**`)
                }

                try {
                    const connection = await channel.join();
                    queueConstruct.connection = connection
                    play(queueConstruct.songs[0])
                } catch (error) {
                    console.log(`Could not join the voice channel: ${error}`)
                    msg.client.queue.delete(msg.guild.id)
                    await channel.leave()
                    return msg.channel.send(`Could not join the voice channel: ${error}`)
                }
            })
            .catch(err => {
                console.log(err)
                return msg.channel.send(`Something went wrong!`)
            })
    }
}