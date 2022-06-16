import type { Config } from '@jest/types'

const config: Config.InitialOptions = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/test/**/*.spec.ts'],
  globals: {
    'ts-jest': {
      diagnostics: false,
      isolatedModules: true,
    },
  },
}
export default config
