import { useSelector } from 'react-redux'

export default action => {
  const loading = useSelector(({ $loading }) => $loading)

  return loading[action.toString()] ?? false
}
