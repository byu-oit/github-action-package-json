import {version} from '../src/setters/version'
import * as core from '@actions/core'

test('throws bad semver type', async () => {
  const pkg = {version: null}
  await expect(() => version(pkg)).toThrow()
})

test('throws invalid semver format', async () => {
  const pkg = {version: ''}
  await expect(() => version(pkg)).toThrow()
})

test('sets output of properly formatted semver', async () => {
  const setOutput = jest.spyOn(core, 'setOutput')
  await version({version: '1.0.0'})
  await expect(setOutput).toBeCalledTimes(6)
})
