<p align="center">
  <a href="https://github.com/actions/typescript-action/actions"><img alt="typescript-action status" src="https://github.com/actions/typescript-action/workflows/build-test/badge.svg"></a>
</p>

# GitHub Action Package JSON

Parses and outputs information from a package.json file

## Usage

```yaml
on: push
# ...
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Parse package.json version
        id: package
        uses: byu-oit/github-action-package-json@v1
        with:
          version: true

      - name: Build and push docker image with version tags
        env:
          # set ECR_REGISTRY
          # set ECR_REPO
          VERSION_TAG: ${{ steps.package.outputs.version }}
          MAJOR_TAG: ${{ steps.package.outputs.version_major }}
          MINOR_TAG: ${{ steps.package.outputs.version_minor }}
        run: |
          docker build -t $ECR_REGISTRY/$ECR_REPO:$VERSION_TAG -t $ECR_REGISTRY/$ECR_REPO:v$MAJOR_TAG -t $ECR_REGISTRY/$ECR_REPO:v$MAJOR_TAG.$MINOR_TAG .
          docker push $ECR_REGISTRY/$ECR_REPO --all-tags
```

## Inputs

| Name      | Description                                               | Default                                    |
|:----------|:----------------------------------------------------------|:-------------------------------------------|
| directory | The working directory of the package.json file            | Current working directory  `process.cwd()` |
| version   | Toggles the version module to output version information. | false                                      |


## Outputs
All outputs are converted to `string` using `JSON.stringify`

| Name    | Type                                                           | Description                                                                                                                                                             |
|:--------|:---------------------------------------------------------------|:------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| version | [Semver \| null](https://github.com/npm/node-semver#functions) | An object containing the version, major, minor, patch, build, adn prerelease properties from the parsed Semver. If the string cannot be parsed, it will be set to null. |
