import YouTube from 'simple-youtube-api'

const token = process.env.YOUTUBE
const youtube = new YouTube(token)

const capitalize = string => {
    return string.charAt(0).toUpperCase() + string.slice(1)
}

const capitalizeWords = string => {
    const splitString = string.split('-')
    let arr = []
    let newString

    for (let word of splitString) {
        arr.push(word.charAt(0).toUpperCase() + word.slice(1))
    }

    newString = arr.join(' ')
    return newString
}

const toRoman = numeral => {
    const roman = [
        [1, 'i'],
        [2, 'ii'],
        [3, 'iii'],
        [4, 'iv'],
        [5, 'v'],
        [6, 'vi'],
        [7, 'vii'],
        [8, 'viii'],
    ]

    for (let i = 0; i < roman.length; i++) {
        if (numeral === roman[i][0]) {
            return roman[i][1]
        }
    }
}

const findVideo = req => {
    return new Promise((resolve, reject) => {
        resolve(youtube.getVideo(req))
            .then(video => video)
    })
}

export { capitalize, capitalizeWords, toRoman, findVideo }