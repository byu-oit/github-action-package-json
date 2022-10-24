import * as core from '@actions/core'
import * as Semver from 'semver'
import { Setter } from './setter'

export const version: Setter = pkg => {
  if (typeof pkg.version !== 'string') {
    throw Error('Package version must be a string')
  }

  const semver = Semver.parse(pkg.version)
  if (semver == null) {
    throw Error(`Invalid semantic version "${pkg.version}"`)
  }

  const { version: pkgVersion, major, minor, patch, build, prerelease } = semver
  core.setOutput('version', pkgVersion)
  core.setOutput('version_major', major)
  core.setOutput('version_minor', minor)
  core.setOutput('version_patch', patch)
  core.setOutput('version_build', build.join('.'))
  core.setOutput('version_prerelease', prerelease.join('.'))
}
