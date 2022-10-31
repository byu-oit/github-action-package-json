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
        uses: byu-oit/github-action-package-json@v2
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

All outputs are converted to `string` using `JSON.stringify` but can be
converted to their output types using the `fromJson` method.

| Name               | Type   | Description                     |
|:-------------------|:-------|:--------------------------------|
| version            | string | The full semantic version       |
| version_major      | number | The major semantic version      |
| version_minor      | number | The minor semantic version      |
| version_patch      | number | The patch semantic version      |
| version_build      | string | The build semantic version      |
| version_prerelease | string | The prerelease semantic version |


## Contributing

This package only parses and exposes information from the package.json file based on what "setters" are available in the
`src/setters/index.ts` file. All setters are must be disabled by default to allow the consuming action to toggle only the
package.json fields that it requires, thus decreasing the duration of the action and speeding up the consuming workflow.

**To parse and expose additional fields from the package.json file, please create a PR with new a setter.**
