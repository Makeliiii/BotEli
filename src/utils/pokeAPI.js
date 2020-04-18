import axios from 'axios'
const base = 'https://pokeapi.co/api/v2'

export const getPokeAPI = (name, endPoint, cb) => {
    if (cb) {
        axios.get(`${base}/${endPoint}/${name}`)
            .then(res => cb(res.data))
            .catch(err => cb(err.request.connection._httpMessage.res))
    }

    return new Promise((resolve, reject) => {
        axios.get(`${base}/${endPoint}/${name}`)
            .then(res => resolve(res.data))
            .catch(err => reject(err.request.connection._httpMessage.res))
    })
}
