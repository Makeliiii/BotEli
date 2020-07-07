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
        if (!args.url) {
            return msg.channel.send('Please provide an argument!')
        }

        if (!msg.member.voice.channel) {
            return msg.channel.send('You must be in a voice channel to play music!')
        }
        
        await search(args.url)
            .then(video => {
                const url = `https://www.youtube.com/watch?v=${video.id}`

                const serverQue = msg.client.queue.get(msg.guild.id)
                const songInfo = ytdl.getInfo(url, '$1')
                const song = {
                    id: songInfo.video_id,
                    title: songInfo.title,
                    url: songInfo.video_url
                }

                if (serverQue) {
                    serverQue.songs.push(song)
                    console.log(serverQue.songs)
                    return msg.channel.send(`**${song.title}** has been added to the queue!`)
                }
                
                const queueConstruct = {
                    tc: msg.channel,
                    vc: msg.member.voice.channel,
                    connection: null,
                    songs: [],
                    volume: 2,
                    playing: true
                }

                msg.client.queue.set(msg.guild.id, queueConstruct)
                queueConstruct.songs.push(song)
            })
    }
}