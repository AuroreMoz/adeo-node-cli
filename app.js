const {getHelp} = require('./actions/help');
const {getFilteredData} = require('./actions/filter');
const {getWithCounters} = require("./actions/count");
const data = require('./data/data').data

const actionToExecute = process.argv.length === 3 ? process.argv[2].split('=') : [''];

print(runAction(actionToExecute));


function runAction(action) {
    switch(action[0]){
        case '--filter':
            if(!action[1]){
                return 'YOU NEED TO DEFINE A VALUE: --filter=value';
            } else {
                const filteredData = getFilteredData(data, action[1]);
                if(!filteredData.length){
                    return 'NO DATA'
                } else {
                    return filteredData;
                }
            }
        case '--count':
            return getWithCounters(data);
        case '--help':
            return getHelp();
        default:
            return 'SORRY, NOTHING TO DO. TRY --help';
    }
}

function print(message) {
    console.log(JSON.stringify(message, null, 2));
}

module.exports = {
    runAction,
}




