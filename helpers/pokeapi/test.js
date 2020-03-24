const { getPokemon } = require('./poke')

getPokemon('bulbasaur', (res) => {
    console.log(res)
})