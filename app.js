const {getHelp} = require("./actions/help");
const {getFilteredData} = require("./actions/filter");

const actionToExecute = process.argv.length === 3 ? process.argv[2].split('=') : [''];

runAction(actionToExecute);

function runAction(action) {
    switch(action[0]){
        case '--filter':
            if(!action[1]){
                console.log('YOU NEED TO DEFINE A VALUE: --filter=value');
            } else {
                const filteredData = getFilteredData(action[1]);
                if(!filteredData.length){
                    console.log('NO DATA')
                } else {
                    console.log(JSON.stringify(filteredData, null, 2));
                }
            }
            break;
        case '--help':
            console.log(getHelp());
            break
        default:
            console.log('SORRY, NOTHING TO DO');
            console.log(getHelp());
    }
}




