const {runAction} = require('./app');
const filter = require('./actions/filter');
const help = require('./actions/help');


jest.mock('./actions/help');
jest.mock('./actions/filter');
jest.mock('./data/data', () => ({data: []}));

beforeEach(()=>{
    console.log = jest.fn();

})

afterEach(() => {
    help.getHelp.mockReset();
    filter.getFilteredData.mockReset();
})

afterAll(() => {
    help.getHelp.mockRestore();
    filter.getFilteredData.mockRestore();
})

jest.mock('./actions/help');

describe('app runAction: help', () => {

    test('when --help, print call with help', () => {
        help.getHelp.mockImplementation(() => 'HELP')
        runAction(['--help'])
        expect(help.getHelp).toHaveBeenCalledTimes(1);
        expect(console.log).toHaveBeenCalledTimes(1);
        expect(console.log).toHaveBeenCalledWith('HELP');
    });
});

describe('app runAction: filter', () => {

    test('when --filter without value, print message to define value', () => {
        runAction(['--filter'])
        expect(filter.getFilteredData).toHaveBeenCalledTimes(0);
        expect(console.log).toHaveBeenCalledTimes(1);
        expect(console.log).toHaveBeenCalledWith(expect.stringContaining('YOU NEED TO DEFINE A VALUE'));
    });
    test('when --filter without result, print message no data', () => {
        filter.getFilteredData.mockImplementation(() => [])
        runAction(['--filter', 'foo'])
        expect(filter.getFilteredData).toHaveBeenCalledTimes(1);
        expect(filter.getFilteredData).toHaveBeenCalledWith([], 'foo');
        expect(console.log).toHaveBeenCalledTimes(1);
        expect(console.log).toHaveBeenCalledWith('NO DATA');
    });
    test('when --filter with result, print result', () => {
        filter.getFilteredData.mockImplementation(() => 'bar')
        runAction(['--filter', 'foo'])
        expect(filter.getFilteredData).toHaveBeenCalledTimes(1);
        expect(filter.getFilteredData).toHaveBeenCalledWith([], 'foo');
        expect(console.log).toHaveBeenCalledTimes(1);
        expect(console.log).toHaveBeenCalledWith('"bar"');
    });
});

describe('app runAction: default', () => {
    test('when unknown param, print sorry message', () => {
        help.getHelp.mockImplementation(() => 'HELP')
        runAction(['--unknown'])
        expect(filter.getFilteredData).toHaveBeenCalledTimes(0);
        expect(console.log).toHaveBeenCalledTimes(1);
        expect(console.log).toHaveBeenCalledWith('SORRY, NOTHING TO DO. TRY --help');
    });
    test('when empty param, print sorry message', () => {        help.getHelp.mockImplementation(() => 'HELP')
        runAction([''])
        expect(filter.getFilteredData).toHaveBeenCalledTimes(0);
        expect(console.log).toHaveBeenCalledTimes(1);
        expect(console.log).toHaveBeenCalledWith('SORRY, NOTHING TO DO. TRY --help');
    });
});