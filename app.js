const {getHelp} = require('./actions/help');
const {getFilteredData} = require('./actions/filter');
const data = require('./data/data').data

const actionToExecute = process.argv.length === 3 ? process.argv[2].split('=') : [''];

runAction(actionToExecute);

function runAction(action) {
    switch(action[0]){
        case '--filter':
            if(!action[1]){
                print('YOU NEED TO DEFINE A VALUE: --filter=value');
            } else {
                const filteredData = getFilteredData(data, action[1]);
                if(!filteredData.length){
                    print('NO DATA')
                } else {
                    print(JSON.stringify(filteredData, null, 2));
                }
            }
            break;
        case '--help':
            print(getHelp());
            break;
        default:
            print('SORRY, NOTHING TO DO. TRY --help');
    }
}

function print(message) {
    console.log(message);
}

module.exports = {
    runAction,
}




