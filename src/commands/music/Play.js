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

        if (!args.url) return msg.channel.send('Please provide an argument!')
        if (!channel) return msg.channel.send('You must be in a voice channel to play music!')
        
        await search(args.url)
            .then(async video => {
                const serverQue = msg.client.queue.get(msg.guild.id)
                let song = {}
                let url
                const queueConstruct = {
                    tc: msg.channel,
                    vc: channel,
                    connection: null,
                    songs: [],
                    volume: 2,
                    playing: true
                }

                if (Array.isArray(video)) {
                    const responses = [1, 2, 3, 4, 5]
                    const filter = response => {
                        return responses.some(res => res.toString() === response.content)
                    }

                    msg.channel.send(`**The search turned up these songs/videos:** \n\n1. **${video[0].title}**\n2. **${video[1].title}**\n3. **${video[2].title}**\n4. **${video[3].title}**\n5. **${video[4].title}**\n\n**Type the number of the song you'd like to be played.**`)
                        .then(() => {
                            msg.channel.awaitMessages(filter, { max: 1, time: 15000, errors: ['time'] })
                                .then(async collected => {
                                    song = {
                                        id: video[collected.first().content - 1].id,
                                        title: video[collected.first().content - 1].title,
                                        url: video[collected.first().content - 1].url
                                    }

                                    if (serverQue) {
                                        serverQue.songs.push(song)
                                        console.log(serverQue.songs)
                                        return msg.channel.send(`**${song.title}** has been added to the queue!`)
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
                        
                                        const dispatcher = queue.connection.play(ytdl(song.url), { volume: 0.2 })
                                            .on('finish', () => {
                                                queue.songs.shift()
                                                play(queue.songs[0])
                                            })
                                            .on('error', error => console.log(error))
                        
                                        msg.channel.send(`Started playing: **${song.title}**`)
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
                                .catch(collected => {
                                    msg.channel.send(`Why no answer pepeHands...`)
                                })
                        })
                } else {
                    url = `https://www.youtube.com/watch?v=${video.id}`

                    song = {
                        id: video.id,
                        title: video.title,
                        url: url
                    }

                    if (serverQue) {
                        serverQue.songs.push(song)
                        console.log(serverQue.songs)
                        return msg.channel.send(`**${song.title}** has been added to the queue!`)
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
        
                        const dispatcher = queue.connection.play(ytdl(song.url), { volume: 0.2 })
                            .on('finish', () => {
                                queue.songs.shift()
                                play(queue.songs[0])
                            })
                            .on('error', error => console.log(error))
        
                        msg.channel.send(`Started playing: **${song.title}**`)
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
                }
            })
            .catch(err => {
                console.log(err)
                return msg.channel.send(`${err}`)
            })
    }
}