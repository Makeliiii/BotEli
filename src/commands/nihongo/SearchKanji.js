import { Command } from 'discord-akairo'
import { MessageEmbed } from 'discord.js'
import { getJishoAPI } from '../../utils/jishoAPI'
import { capitalizeWords } from '../../utils/tools'

export default class SearchKanji extends Command {
    constructor() {
        super('searchkanji', {
            aliases: ['searchkanji', 'kanji'],
            cooldown: 10000,
            ratelimit: 1,
            category: 'nihongo',
            description: 'Search for kanji from the jisho API.',
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

        await getJishoAPI(args.kanji)
            .then(kanji => {
                const length = kanji.data.length
                const filterArray = []

                for (let i = 0; i < length; i++) {
                    filterArray.push(i + 1)
                }

                const filter = response => {
                    return filterArray.some(res => res.toString() === response.content)
                }

                msg.channel.send(`**The search turned up these kanji:**\n${kanji.data.map((kanji, index) => `\n${index + 1}. ${kanji.slug}`)}\n\n**Type the number of the kanji you'd like info on.**`)
                    .then(() => {
                        msg.channel.awaitMessages(filter, { max: 1, time: 15000, errors: ['time'] })
                            .then(collected => {
                                console.log(collected)
                                const kanjiObj = {
                                    slug: kanji.data[collected.first().content - 1].slug,
                                    tags: kanji.data[collected.first().content - 1].tags,
                                    is_common: kanji.data[collected.first().content - 1].is_common,
                                    jlpt: kanji.data[collected.first().content - 1].jlpt,
                                    japanese: kanji.data[collected.first().content - 1].japanese[0],
                                    english_definitions: kanji.data[collected.first().content - 1].senses[0].english_definitions,
                                }

                                const embed = new MessageEmbed()
                                .setTitle(kanjiObj.slug)
                                .addField('**Meaning(s):**', kanjiObj.english_definitions.map(def => `${def}`).join(', '), true)
                                .addField('**Reading:**', kanjiObj.japanese.reading, true)
                                .addField('**JLPT Level:**', !kanjiObj.jlpt.length ? 'Dunno, no data here' : capitalizeWords(kanjiObj.jlpt[0]).toUpperCase(), true)
                                .addField('**Tags:**', !kanjiObj.tags.length ? 'None' : kanjiObj.tags, true)
                                .addField('**Is Common:**', !kanjiObj.is_common ? 'Not' : 'Yes', true)

                                return msg.channel.send(embed)
                            })
                    })
            })
    }
}