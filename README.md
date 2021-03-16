<p align="center">
  <a href="https://github.com/actions/typescript-action/actions"><img alt="typescript-action status" src="https://github.com/actions/typescript-action/workflows/build-test/badge.svg"></a>
</p>

# GitHub Action Package JSON

Parses and outputs information from a package.json file

### Inputs

| Name      | Description                                               | Default                                    |
|:----------|:----------------------------------------------------------|:-------------------------------------------|
| directory | The working directory of the package.json file            | Current working directory  `process.cwd()` |
| version   | Toggles the version module to output version information. | false                                      |


### Outputs
All outputs are converted to `string` using `JSON.stringify`

| Name    | Type                                                           | Description                                                                                                                                                             |
|:--------|:---------------------------------------------------------------|:------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| version | [Semver \| null](https://github.com/npm/node-semver#functions) | An object containing the version, major, minor, patch, build, adn prerelease properties from the parsed Semver. If the string cannot be parsed, it will be set to null. |
