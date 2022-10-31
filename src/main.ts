import * as core from '@actions/core'
import * as path from 'path'
import { readFileSync } from 'fs'
import setters from './setters'
import {
  enoentErrorMessage,
  errorMessage,
  syntaxErrorMessage
} from './util'

function run (): void {
  try {
    const dir = core.getInput('directory', { required: false })
    const file = dir != null
      ? path.join(process.cwd(), dir, 'package.json')
      : path.join(process.cwd(), 'package.json')
    const content = readFileSync(file, { encoding: 'utf-8' })
    const pkg = JSON.parse(content)
    const setterNames = Object.keys(setters)
    for (const setterName of setterNames) {
      const invoke = core.getInput(setterName, { required: false }) === 'true'
      if (invoke) setters[setterName](pkg)
    }
  } catch (e: unknown) {
    const message = enoentErrorMessage(e) ?? syntaxErrorMessage(e) ?? errorMessage(e)
    core.setFailed(message)
  }
}

run()
