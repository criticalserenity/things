import { createAction as createReduxAction } from '@reduxjs/toolkit'

const createAsyncAction = ({ type, namespace, state, payloadCreator }) => {
  const creator = createReduxAction(`${type}:${state}[${namespace}]`, payloadCreator)

  const action = (...args) => ({
    ...creator(...args),
    config: {
      namespace,
      state,
      statelessType: `${type}[${namespace}]`,
    },
  })

  action.type = type
  action.toString = () => `${type}:${state}[${namespace}]`

  return action
}

const createAction = (type, namespace, { request, success, failure } = {}) => ({
  request: createAsyncAction({
    type,
    namespace,
    state: 'request',
    payloadCreator: request,
  }),
  success: createAsyncAction({
    type,
    namespace,
    state: 'success',
    payloadCreator: success,
  }),
  failure: createAsyncAction({
    type,
    namespace,
    state: 'failure',
    payloadCreator: failure || (error => ({ error })),
  }),
  toString: () => `${type}[${namespace}]`,
})

createAction.sync = (type, namespace, payloadCreator) =>
  createReduxAction(`${type}[${namespace}]`, payloadCreator)

export default createAction
