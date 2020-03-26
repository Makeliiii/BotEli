const axios = require('axios').default
const base = 'https://pokeapi.co/api/v2'

module.exports = {
    getPokemon: (name, cb) => {
        axios.get(`${base}/pokemon/${name}`)
            .then(res => cb(res.data))
            .catch(err => {
                console.log(err.request.connection._httpMessage.res.statusCode)
                return cb(err.request.connection._httpMessage.res)
            })
    },
    getEvolutionLine: (id, cb) => {
        axios.get(`${base}/evolution-chain/${id}`)
            .then(res => cb(res.data))
            .catch(err => console.log(err))
    }
}