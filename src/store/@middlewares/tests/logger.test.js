import configureStore from 'redux-mock-store'
import { createAction } from 'store/@utils'
import logger from '../logger'

describe('logger middleware', () => {
  const mockStore = configureStore([logger])
  const store = mockStore()
  const consoleError = jest.fn()
  const error = new Error('Error')

  beforeEach(() => {
    jest.spyOn(console, 'error').mockImplementation(consoleError)
    jest.spyOn(console, 'groupCollapsed').mockImplementation(jest.fn())
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should log error action', () => {
    const action = createAction('action', 'test')

    store.dispatch(action.failure(error))

    expect(console.error).toHaveBeenCalledWith(error)
  })

  it('should skip request and success actions', () => {
    const action = createAction('action', 'test')

    store.dispatch(action.request())
    store.dispatch(action.success())

    expect(console.error).not.toHaveBeenCalled()
  })

  it('should log response error if presented', () => {
    const action = createAction('action', 'test')
    const responseError = {
      message: 'Failure action',
      response: { data: { error: 'Action response error' } },
    }

    store.dispatch(action.failure(responseError))

    expect(console.error).toHaveBeenCalledWith(
      `Response error: ${responseError.response.data.error}`,
    )
  })
})
