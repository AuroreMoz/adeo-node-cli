const {getWithCounters} = require('./count');
const {simpleCountry, countries} = require('../data/data.testing')

describe('count data: missing data', () => {

    test('count with empty data return empty', () => {
        expect(getWithCounters([])).toEqual([]);
    });


    test('count without people return 0', () => {
        const countryWithoutPeople = [{
            name: 'simpleCountryWithoutPeople'
        }]
        const expected = [{
            name: 'simpleCountryWithoutPeople [0]',
        }]
        expect(getWithCounters(countryWithoutPeople)).toEqual(expected);
    });

    test('count with empty people return 0', () => {
        const countryWithEmptyPeople = [{
            name: 'simpleCountryWithEmptyPeople',
            people: []
        }]
        const expected = [{
            name: 'simpleCountryWithEmptyPeople [0]',
            people: []
        }]
        expect(getWithCounters(countryWithEmptyPeople)).toEqual(expected);
    });

    test('count without animals return 0', () => {
        const peopleWithoutAnimals = [{
            name: 'simpleCountry',
            people: [{
                name: 'personWithoutAnimals'
            }]
        }]
        const expected = [{
            name: 'simpleCountry [1]',
            people: [{
                name: 'personWithoutAnimals [0]',
            }]
        }]
        expect(getWithCounters(peopleWithoutAnimals)).toEqual(expected);
    });

    test('count with empty animals return 0', () => {
        const peopleWithEmptyAnimals = [{
            name: 'simpleCountry',
            people: [{
                name: 'personWithEmptyAnimals',
                animals: []
            }]
        }]
        const expected = [{
            name: 'simpleCountry [1]',
            people: [{
                name: 'personWithEmptyAnimals [0]',
                animals: []
            }]
        }]
        expect(getWithCounters(peopleWithEmptyAnimals)).toEqual(expected);
    });
});

describe('count data: data 0K', () => {

    test('count on simple country adds counters', () => {
        const expected = [{
            name: 'Dillauti [1]',
            people:
                [{
                    name: 'Winifred Graham [6]',
                    animals:
                        [{name: 'Anoa'},
                            {name: 'Duck'},
                            {name: 'Naroal'},
                            {name: 'Badger'},
                            {name: 'Cobra'},
                            {name: 'Crow'}]
                }]
        }];
        expect(getWithCounters(simpleCountry)).toEqual(expected);
    });

    test('count on countries adds counters', () => {
        const expected = [
            {
                name: 'Dillauti [2]',
                people: [
                    {
                        name: 'Winifred Graham [7]',
                        animals:
                            [{name: 'Anoa'},
                                {name: 'Duck'},
                                {name: 'Narwhal'},
                                {name: 'Badger'},
                                {name: 'Cobra'},
                                {name: 'Crow'},
                                {name: 'Tortoise'}]
                    },
                    {
                        name: 'Blanche Viciani [8]',
                        animals:
                            [{name: 'Barbet'},
                                {name: 'Rhea'},
                                {name: 'Snakes'},
                                {name: 'Antelope'},
                                {name: 'Echidna'},
                                {name: 'Crow'},
                                {name: 'Guinea Fowl'},
                                {name: 'Deer Mouse'}]
                    }
                ]
            },
            {
                name: 'Tohabdal [3]',
                people: [
                    {
                        name: 'Effie Houghton [7]',
                        animals:
                            [{name: 'Zebra'},
                                {name: 'Ring-tailed Lemur'},
                                {name: 'Fly'},
                                {name: 'Blue Iguana'},
                                {name: 'Emu'},
                                {name: 'African Wild Ass'},
                                {name: 'Numbat'}]
                    },
                    {
                        name: 'Essie Bennett [7]',
                        animals:
                            [{name: 'Aldabra Tortoise'},
                                {name: 'Patagonian Toothfish'},
                                {name: 'Giant Panda'},
                                {name: 'Goat'},
                                {name: 'Quahog'},
                                {name: 'Collared Lemur'},
                                {name: 'Aldabra Tortoise'}]
                    },
                    {
                        name: 'Owen Bongini [6]',
                        animals:
                            [{name: 'Zebrashark'},
                                {name: 'Dogs'},
                                {name: 'Mouse'},
                                {name: 'Tortoise'},
                                {name: 'Numbat'},
                                {name: 'African Wild Dog'}]
                    }
                ]
            }
        ]
        expect(getWithCounters(countries)).toEqual(expected);
    });
});
