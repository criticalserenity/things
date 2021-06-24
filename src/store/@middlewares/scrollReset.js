import { LOCATION_CHANGE } from 'connected-react-router'

export default () => next => action => {
  if (action.type === LOCATION_CHANGE) {
    window.scrollTo(0, 0)
  }

  next(action)
}
