const getWithCounters = (countries) => {
    return addPeopleCounters(countries);
}

function addPeopleCounters(countries=[]){
    return countries.map(country => ({
        ...addCounters(country, country.people),
        ...addPeople(country.people)
    }));
}

function addAnimalsCounters(people=[]){
    return people.map(person => addCounters(person, person.animals));
}

function addCounters(element, list){
    const count = getCount(list);
    return {
        ...element,
        name: `${element.name} [${count}]`
    }
}
function addPeople(people){
    if(!people){
        return {}
    }
    return {
        people: addAnimalsCounters(people)
    }
}


function getCount(list=[]){
    return list.length;
}

module.exports = {
    getWithCounters
}