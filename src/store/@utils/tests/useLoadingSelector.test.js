import React from 'react'
import { mount } from 'enzyme'
import { Provider } from 'react-redux'
import createAction from '../createAction'
import useLoadingSelector from '../useLoadingSelector'

const action = createAction('hello', 'test')

const Hello = () => {
  const isLoadingAction = useLoadingSelector(action)

  return (
    <button type="button" disabled={isLoadingAction}>
      Ok
    </button>
  )
}

describe('useLoadingSelector', () => {
  it('should return true if action is in progress', () => {
    const store = global.mockStore({
      $loading: {
        'hello[test]': true,
      },
    })

    const component = mount(
      <Provider store={store}>
        <Hello />
      </Provider>,
    )

    expect(component.find('button').prop('disabled')).toStrictEqual(true)
  })

  it('should return false if action is not in progress', () => {
    const store = global.mockStore({
      $loading: {
        'hello[test]': false,
      },
    })

    const component = mount(
      <Provider store={store}>
        <Hello />
      </Provider>,
    )

    expect(component.find('button').prop('disabled')).toStrictEqual(false)
  })

  it('should return false if action is never dispatched', () => {
    const store = global.mockStore({
      $loading: {},
    })

    const component = mount(
      <Provider store={store}>
        <Hello />
      </Provider>,
    )

    expect(component.find('button').prop('disabled')).toStrictEqual(false)
  })
})
