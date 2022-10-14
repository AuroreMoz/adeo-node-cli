const {runAction} = require('./app');
const filter = require('./actions/filter');
const help = require('./actions/help');

jest.mock('./actions/help');
jest.mock('./actions/filter');
jest.mock('./data/data', () => ({data: []}));

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
        const result = runAction(['--help'])
        expect(help.getHelp).toHaveBeenCalledTimes(1);
        expect(result).toEqual('HELP');
    });
});

describe('app runAction: filter', () => {

    test('when --filter without value, print message to define value', () => {
        const result = runAction(['--filter'])
        expect(filter.getFilteredData).toHaveBeenCalledTimes(0);
        expect(result).toMatch(/YOU NEED TO DEFINE A VALUE/);
    });

    test('when --filter with bad pattern, print bad pattern error', () => {
        filter.getFilteredData.mockImplementation(() => [])
        const result = runAction(['--filter', '*'])
        expect(filter.getFilteredData).toHaveBeenCalledTimes(0);
        expect(result).toEqual('BAD PATTERN. NEED TO BE A REGULAR EXPRESSION');
    });

    test('when --filter without result, print message no data', () => {
        filter.getFilteredData.mockImplementation(() => [])
        const result = runAction(['--filter', 'foo'])
        expect(filter.getFilteredData).toHaveBeenCalledTimes(1);
        expect(filter.getFilteredData).toHaveBeenCalledWith([], new RegExp('foo'));
        expect(result).toEqual('NO DATA');

    });

    test('when --filter with result, print result', () => {
        filter.getFilteredData.mockImplementation(() => 'bar')
        const result = runAction(['--filter', 'foo'])
        expect(filter.getFilteredData).toHaveBeenCalledTimes(1);
        expect(filter.getFilteredData).toHaveBeenCalledWith([], new RegExp('foo'));
        expect(result).toEqual('"bar"');
    });
});

describe('app runAction: default', () => {
    test('when unknown param, print sorry message', () => {
        help.getHelp.mockImplementation(() => 'HELP')
        const result = runAction(['--unknown'])
        expect(filter.getFilteredData).toHaveBeenCalledTimes(0);
        expect(result).toEqual('SORRY, NOTHING TO DO. TRY --help');
    });

    test('when empty param, print sorry message', () => {
        help.getHelp.mockImplementation(() => 'HELP')
        const result = runAction([''])
        expect(filter.getFilteredData).toHaveBeenCalledTimes(0);
        expect(result).toEqual('SORRY, NOTHING TO DO. TRY --help');
    });
});