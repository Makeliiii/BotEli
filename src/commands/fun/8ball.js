import { Command } from 'discord-akairo'

export default class EightBall extends Command {
    constructor() {
        super('eightball', {
            aliases: ['8ball', '8-ball', 'eightball', 'leninardoball'],
            ratelimit: 1,
            category: 'fun',
            description: 'Ask a yes/no question from the magic Leninardo-ball.',
            args: [
                {
                    id: 'question',
                    type: 'string'
                }
            ]
        })
    }

    exec(msg, args) {
        if (!args.question) return msg.channel.send('Please ask a yes/no question.')

        const answers = [
            'It is certain.',
            'It is decidedly so.',
            'Without a doubt.',
            'Yes - definitely.',
            'You may rely on it.',
            'As I see it, yes.',
            'Most likely.',
            'Outlook good.',
            'Yes.',
            'Signs point to yes.',
            'Reply hazy, try again.',
            'Ask again later.',
            'Better not tell you now.',
            'Cannot predict now.',
            'Concentrate and ask again.',
            'Don\'t count on it.',
            'My reply is no.',
            'My sources say no.',
            'Outlook not so good.',
            'Very doubtful.'
        ]
        
        const index = Math.floor(Math.random() * Math.floor(answers.length))

        return msg.channel.send(answers[index])
    }
}