const {getFilteredData} = require('./filter');
const {simpleCountry, countries} = require('../data/data.testing')

describe('filter data: missing data', () => {

    test('filter with empty data return empty', () => {
        expect(getFilteredData([])).toEqual([]);
    });

    test('filter without people return empty', () => {
        const countryWithoutPeople = [{
            name: 'simpleCountryWithoutPeople'
        }]
        expect(getFilteredData(countryWithoutPeople)).toEqual([]);
    });

    test('filter with empty people return empty', () => {
        const countryWithEmptyPeople = [{
            name: 'simpleCountryWithEmptyPeople',
            people: []
        }]
        expect(getFilteredData(countryWithEmptyPeople)).toEqual([]);
    });

    test('filter without animals return empty', () => {
        const peopleWithoutAnimals = [{
            name: 'simpleCountry',
            people: [{
                name: 'personWithoutAnimals'
            }]
        }]
        expect(getFilteredData(peopleWithoutAnimals)).toEqual([]);
    });

    test('filter with empty animals return empty', () => {
        const peopleWithEmptyAnimals = [{
            name: 'simpleCountry',
            people: [{
                name: 'personWithEmptyAnimals',
                animals: []
            }]
        }]
        expect(getFilteredData(peopleWithEmptyAnimals)).toEqual([]);
    });
});

describe('filter data: simple data', () => {

    test('filter with no matching pattern', () => {
        expect(getFilteredData(simpleCountry, 'aaa')).toEqual([]);
    });

    test('filter with one animal matching', () => {
        const expected = [{
            name: 'Dillauti',
            people: [{
                name: 'Winifred Graham',
                animals: [
                    {name: 'Anoa'},
                ]
            }]
        }];
        expect(getFilteredData(simpleCountry, 'oa$')).toEqual(expected);
    });

    test('filter with two animals matching', () => {
        const expected = [{
            name: 'Dillauti',
            people: [{
                name: 'Winifred Graham',
                animals: [
                    {name: 'Anoa'},
                    {name: 'Naroal'}
                ]
            }]
        }];
        expect(getFilteredData(simpleCountry, 'oa')).toEqual(expected);
    });
})

describe('filter data: complex data', () => {
    test('filter matches nothing', () => {
        expect(getFilteredData(countries, 'z')).toEqual([]);
    })
    test('filter matches one country, one person', () => {
        const expected = [{
            name: 'Dillauti',
            people: [{
                name: 'Winifred Graham',
                animals: [
                    {name: 'Narwhal'},
                ]
            }]
        }];
        expect(getFilteredData(countries, 'wh')).toEqual(expected);
    });
    test('filter matches one country, two persons,', () => {
        const expected = [{
            name: 'Tohabdal',
            people: [
                {
                    name: 'Effie Houghton',
                    animals:
                        [{name: 'Zebra'}]
                },
                {
                    name: 'Owen Bongini',
                    animals:
                        [{name: 'Zebrashark'}]
                }
            ]
        }];
        expect(getFilteredData(countries, 'z|Z')).toEqual(expected);
    })

    test('filter matches two countries, two persons,', () => {
        const expected = [{
            name: 'Dillauti',
            people: [
                {
                    name: 'Winifred Graham',
                    animals:
                        [{name: 'Tortoise'}]
                }
            ]
        },
        {
            name: 'Tohabdal',
            people: [
                {
                    name: 'Essie Bennett',
                    animals: [
                        {name: 'Aldabra Tortoise'},
                        {name: 'Aldabra Tortoise'}
                    ]
                },
                {
                    name: 'Owen Bongini',
                    animals: [{name: 'Tortoise'}]
                }
            ]
        }];
        expect(getFilteredData(countries, 'to')).toEqual(expected);
    })

    test('filter matches all,', () => {
        expect(getFilteredData(countries, '.*')).toEqual(countries);
    })
});
