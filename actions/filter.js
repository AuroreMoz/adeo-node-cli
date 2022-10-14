const data = require('../data/data').data

const getFilteredData = (countries, filter) => {
    return getFilteredCountries(countries, filter);
}

function getFilteredCountries(countries, filter){
    return countries
        .map(country => ({ ...country, people: getFilteredPeople(country.people, filter)}))
        .filter(country => country.people.length)
}

function getFilteredPeople(people, filter){
    return people
        .map(person => ({ ...person, animals: getFilteredAnimals(person.animals, filter)}))
        .filter(person => person.animals.length)
}

function getFilteredAnimals(animals, filter) {
    return animals.filter((animal => animal.name.match(new RegExp(filter))));
}

module.exports = {
    getFilteredData
}