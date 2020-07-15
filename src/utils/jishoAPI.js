import axios from 'axios'
const base = 'https://jisho.org/api/v1/search/words?keyword'

export const getJishoAPI = (kanji, cb) => {
    if (cb) {
        axios.get(`${base}=${kanji}`)
            .then(res => cb(res.data))
            .catch(err => cb(err))
    }

    return new Promise((resolve, reject) => {
        axios.get(`${base}=${kanji}`)
            .then(res => resolve(res.data))
            .catch(err => reject(err))
    })
}