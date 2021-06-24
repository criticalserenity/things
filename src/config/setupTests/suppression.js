import React from 'react'

// suppress server rendering warning
React.useLayoutEffect = React.useEffect

// suppress useless warnings
const consoleError = console.error
const consoleWarning = console.warn
const blacklist = [
  'Warning: An update to %s inside a test was not wrapped in act', // testing-library warning doesn't make sense since we use enzyme
  'Warning: componentWillReceiveProps has been renamed, and is not recommended for use.', // warning of external libraries
]

jest.spyOn(console, 'error').mockImplementation((...args) => {
  if (!blacklist.some(warning => args[0].toString().includes(warning))) consoleError(...args)
})

jest.spyOn(console, 'warn').mockImplementation((...args) => {
  if (!blacklist.some(warning => args[0].toString().includes(warning))) consoleWarning(...args)
})
