import createAction from '../createAction'

describe('createAction', () => {
  const actionType = 'action'
  const namespace = 'test'

  it('should create plain action', () => {
    const action = createAction.sync(actionType, namespace)

    expect(action()).toStrictEqual({ type: 'action[test]', payload: undefined })
  })

  it('should create action with custom payload', () => {
    const action = createAction.sync(actionType, namespace, id => ({ payload: { id } }))

    expect(action(42)).toStrictEqual({ type: 'action[test]', payload: { id: 42 } })
  })

  describe('async actions', () => {
    const action = createAction(actionType, namespace, {
      request: id => ({ payload: { id } }),
      success: data => ({ payload: { data } }),
      failure: error => ({ error }),
    })

    it('should return original action type via toString', () => {
      expect(action.toString()).toStrictEqual('action[test]')
    })

    describe('request', () => {
      it('should add :request suffix to action type', () => {
        const id = 42

        expect(action.request(id)).toStrictEqual({
          type: 'action:request[test]',
          payload: { id },
          config: {
            namespace,
            state: 'request',
            statelessType: 'action[test]',
          },
        })
      })
    })

    describe('success', () => {
      it('should add :success suffix to action type', () => {
        const data = { one: 1, two: 2, three: 3 }

        expect(action.success(data)).toStrictEqual({
          type: 'action:success[test]',
          payload: { data },
          config: {
            namespace,
            state: 'success',
            statelessType: 'action[test]',
          },
        })
      })
    })

    describe('failure', () => {
      it('should add :success suffix to action type', () => {
        const error = new Error()

        expect(action.failure(error)).toStrictEqual({
          type: 'action:failure[test]',
          payload: undefined,
          error,
          config: {
            namespace,
            state: 'failure',
            statelessType: 'action[test]',
          },
        })
      })

      it('should use default payload creator if missing', () => {
        const failureAction = createAction(actionType, namespace)
        const error = new Error()

        expect(failureAction.failure(error)).toStrictEqual({
          type: 'action:failure[test]',
          payload: undefined,
          error,
          config: {
            namespace,
            state: 'failure',
            statelessType: 'action[test]',
          },
        })
      })
    })
  })
})
