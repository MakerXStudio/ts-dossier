import type { Config } from '@jest/types'
import { createDefaultPreset } from 'ts-jest'

const tsJestPreset = createDefaultPreset({
  diagnostics: false,
  isolatedModules: true,
})

const config: Config.InitialOptions = {
  roots: ['<rootDir>/test/'],
  testMatch: ['/**/*.spec.ts'],
  ...tsJestPreset,
  preset: 'ts-jest',
  testEnvironment: 'node',
  coverageReporters: ['text'],
}
export default config
