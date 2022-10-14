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
                try {
                    const filter = new RegExp(action[1]);
                    const filteredData = getFilteredData(data, filter);
                    if(!filteredData.length){
                        return 'NO DATA'
                    } else {
                        return JSON.stringify(filteredData, null, 2);
                    }
                } catch (SyntaxError){
                    return 'BAD PATTERN. NEED TO BE A REGULAR EXPRESSION'
                }
            }
        case '--count':
            return JSON.stringify(getWithCounters(data), null, 2);
        case '--help':
            return getHelp();
        default:
            return 'SORRY, NOTHING TO DO. TRY --help';
    }
}

function print(message) {
    console.log(message);
}

module.exports = {
    runAction,
}




