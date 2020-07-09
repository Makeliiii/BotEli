import { Command } from 'discord-akairo'

export default class GitHub extends Command {
    constructor() {
        super('github', {
            aliases: ['github', 'repo', 'repository'],
            category: 'util',
            description: 'GitHub link.',
        })
    }

    exec(msg) {
        return msg.channel.send('GitHub repo here: https://github.com/Makeliiii/Leninardo')
    }
}