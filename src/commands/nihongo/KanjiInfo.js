import { Command } from 'discord-akairo'
import { MessageEmbed } from 'discord.js'
import { capitalize } from '../../utils/tools'

export default class KanjiInfo extends Command {
    constructor() {
        super('kanjiinfo', {
            aliases: ['kanjiinfo'],
            cooldown: 10000,
            ratelimit: 1,
            category: 'nihongo',
            description: 'Get information on a specific kanji, i.e. JLPT level, meanings, kun and on, and stroke order.',
            args: [
                {
                    id: 'kanji',
                    type: 'string',
                    match: 'content'
                }
            ]
        })
    }

    async exec(msg, args) {
        if (!args.kanji) return msg.channel.send('Please provide correct arguments!')

        await this.client.jisho.searchForKanji(args.kanji)
            .then(kanji => {
                if (!kanji.found) return msg.channel.send('Could not find any matching kanji!')

                const embed = new MessageEmbed()
                    .setTitle(kanji.query)
                    .setURL(kanji.uri)
                    .setThumbnail(kanji.strokeOrderGifUri)
                    .addField('**Meaning(s):**', kanji.meaning)
                    .addField('**Stroke count:**', kanji.strokeCount, true)
                    .addField('**Taught in:**', capitalize(kanji.taughtIn), true)
                    .addField('**JLPT Level:**', !kanji.jlptLevel ? 'No data...' : kanji.jlptLevel, true)
                    .addField('**Kunyomi:**', kanji.kunyomi.map(kun => `${kun}`), true)
                    .addField('**Onyomi:**', kanji.onyomi.map(on => `${on}`), true)
                    .addField('**Parts:**', kanji.parts.map(part => part).join(',  '), true)

                return msg.channel.send(embed)
            })
    }
}