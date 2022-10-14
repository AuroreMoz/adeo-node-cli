const getHelp = () => {
    return `
    Usage: node app.js [option]
    Options:
    --help              print help
    --filter=value      print only countries, people and animals who animals names match the filter pattern value.
                        the pattern can be a regular expression.
    --count             print the counts of People and Animals by counting the number of children and appending it in the name`
}

module.exports = {
    getHelp
}