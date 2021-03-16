import * as core from '@actions/core'
import * as path from 'path'
import {readFileSync} from 'fs'
import setters from './setters'

async function run(): Promise<void> {
  try {
    const dir = core.getInput('directory', {required: false})
    const file = dir
      ? path.join(process.cwd(), dir, 'package.json')
      : path.join(process.cwd(), 'package.json')

    const content = readFileSync(file, {encoding: 'utf-8'})
    const pkg = JSON.parse(content)

    const mods = Object.keys(setters)
    try {
      for (const mod of mods) {
        const invoke = core.getInput(mod, {required: false}) === 'true'
        if (invoke) setters[mod](pkg)
      }
    } catch (e) {
      core.setFailed(e.message)
    }
  } catch (e) {
    const msg =
      e.code === 'ENOENT'
        ? `No package.json found`
        : `An unknown error occurred: ${e.message}`
    core.setFailed(msg)
  }
}

run()
