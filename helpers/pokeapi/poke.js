const axios = require('axios').default
const base = 'https://pokeapi.co/api/v2'

module.exports = {
    getPokemon: (name, cb) => {
        axios.get(`${base}/pokemon/${name}`)
            .then(res => cb(res.data))
            .catch(err => console.log(err))
    },
    getEvolutionLine: (name, cb) => {
        axios.get(`${base}/evolution-chain/${name}`)
            .then(res => cb(res.data))
            .catch(err => console.log(err))
    }
}