import { useMemo } from 'react'
import { useDispatch } from 'react-redux'

export default action => {
  const dispatch = useDispatch()
  const actionCreator = action.request || action

  return useMemo(
    () =>
      (...args) =>
        dispatch(actionCreator(...args)),
    [actionCreator, dispatch],
  )
}
