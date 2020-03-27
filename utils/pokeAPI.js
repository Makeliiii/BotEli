const axios = require('axios').default
const base = 'https://pokeapi.co/api/v2'

module.exports = {
    getPokeAPI: (name, endPoint, cb) => {
        axios.get(`${base}/${endPoint}/${name}`)
            .then(res => cb(res.data))
            .catch(err => {
                console.log(err)
                return cb(err.request.connection._httpMessage.res)
            })
    },
}