import React, { useEffect } from 'react'
import { mount } from 'enzyme'
import { Provider } from 'react-redux'
import useAction from '../useAction'
import createAction from '../createAction'

const syncAction = createAction.sync('sync', 'test')

const asyncAction = createAction('async', 'test')

describe('useAction', () => {
  it('should bind sync redux action', () => {
    const store = global.mockStore()

    const Hello = () => {
      const action = useAction(syncAction)

      useEffect(() => {
        action()
      }, [action])

      return null
    }

    mount(
      <Provider store={store}>
        <Hello />
      </Provider>,
    )

    expect(store.getActions()).toStrictEqual([syncAction()])
  })

  it('should bind async redux action', () => {
    const store = global.mockStore()

    const Hello = () => {
      const action = useAction(asyncAction)

      useEffect(() => {
        action()
      }, [action])

      return null
    }

    mount(
      <Provider store={store}>
        <Hello />
      </Provider>,
    )

    expect(store.getActions()).toStrictEqual([asyncAction.request()])
  })
})
