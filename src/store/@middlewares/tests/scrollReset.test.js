import configureStore from 'redux-mock-store'
import { LOCATION_CHANGE } from 'connected-react-router'
import scrollReset from '../scrollReset'

describe('scrollReset middleware', () => {
  const mockStore = configureStore([scrollReset])
  const store = mockStore()
  const scrollTo = jest.fn()

  beforeEach(() => jest.spyOn(global, 'scrollTo').mockImplementationOnce(scrollTo))

  afterEach(() => jest.clearAllMocks())

  it('should reset scroll on location change', () => {
    store.dispatch({ type: LOCATION_CHANGE })

    expect(scrollTo).toHaveBeenCalledWith(0, 0)
  })

  it('should skip any other action', () => {
    store.dispatch({ type: 'action' })

    expect(scrollTo).not.toHaveBeenCalled()
  })
})
