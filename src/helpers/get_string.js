const get_string = (key, iso_639_1_language, parameters) => {
    const dictionary = require(`../static/dictionaries/${iso_639_1_language}`)
    return dictionary(key, parameters)
}

module.exports = get_string