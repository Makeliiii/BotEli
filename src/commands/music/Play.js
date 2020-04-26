import { Command } from 'discord-akairo'
import { player } from '../../index'

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

        if (player.isPlaying(msg.guild.id)) {
            await player.addToQueue(msg.guild.id, args.url)
                .then(song => {
                    return msg.channel.send(`Song: ${song.name} added to que!`)
                })
                .catch(() => {
                    return msg.channel.send('No song found!')
                })
        } else {
            await player.play(msg.member.voice.channel, args.url)
                .then(song => {
                    return msg.channel.send(`Now playing: ${song.name}!`)
                })
                .catch(() => {
                    return msg.channel.send('No song found!')
                })
        }
    }
}