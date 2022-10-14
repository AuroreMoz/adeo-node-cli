# ADEO-NODE-CLI

adeo-node-cli is a command line interface allowing to perform different actions on a list of data, corresponding to `Countries` containing `Peoples` containing `Animals`.

Data are available in the `data.js` file.

## Available actions

### --help
print help for adeo-node-cli options
Exemple:
```
node app.js --help
```

### --filter=pattern
print countries, people and animals who only match the filter pattern value.
the pattern can be a regular expression.
Exemple:
```
node app.js --filter=ry$
```