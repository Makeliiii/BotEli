module.exports = {
    capitalize: string => {
        return string.charAt(0).toUpperCase() + string.slice(1)
    },
    capitalizeWords: string => {
        const splitString = string.split('-')
        let arr = []
        let newString

        for (let word of splitString) {
            arr.push(word.charAt(0).toUpperCase() + word.slice(1))
        }

        newString = arr.join(' ')
        return newString
    }
}