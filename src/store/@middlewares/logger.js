export default () => next => action => {
  const { type, error, config } = action
  const responseError = error?.response?.data?.error

  if (config?.state === 'failure') {
    console.groupCollapsed(`%c${type}`, 'color: red')
    console.error(error)
    if (responseError) console.error(`Response error: ${responseError}`)
    console.groupEnd()
  }

  next(action)
}
