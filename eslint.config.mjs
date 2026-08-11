import coreWebVitals from 'eslint-config-next/core-web-vitals'
import typescript from 'eslint-config-next/typescript'

// Flat config. eslint-config-next 16 ships flat configs directly, so there is
// no FlatCompat shim here.
const config = [
  { ignores: ['.next/**', 'node_modules/**', '.agents/**', '.claude/**'] },
  ...coreWebVitals,
  ...typescript,
]

export default config
