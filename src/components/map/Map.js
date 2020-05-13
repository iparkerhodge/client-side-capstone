import React, { useContext, useEffect } from 'react'
import keplerGLReducer from 'kepler.gl/reducers'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { taskMiddleware } from 'react-palm/tasks'
import { Provider, useDispatch } from 'react-redux'
import KeplerGl from 'kepler.gl'
import { addDataToMap } from 'kepler.gl/actions'
import { JSONContext } from './JSONConverter'

const reducers = combineReducers({
  keplerGl: keplerGLReducer
})

const store = createStore(reducers, {}, applyMiddleware(taskMiddleware))

const Kepler = () => {
  return (
  <Provider store={store}>
    <Map />
  </Provider>)
}

export default Kepler

const Map = (props) => {
  const dispatch = useDispatch()
  const {formattedJSON} = useContext(JSONContext)
  console.log(formattedJSON)

  useEffect(() => {
      if (formattedJSON) {
        dispatch(
        addDataToMap({
          datasets: {
            info: {
              label: 'COVID-19',
              id: 'covid19'
            },
            data: formattedJSON
          },
          option: {
            centerMap: true,
            readOnly: true
          },
          config: {}
        })
      )
      console.log(formattedJSON)
      console.log('i dispatched')
    }}, [dispatch, formattedJSON])

  return <KeplerGl id='covid' mapboxApiAccessToken='pk.eyJ1IjoicGFya2VyaG9kZ2UiLCJhIjoiY2thMmtwYnlkMDc1bTNmbmR3bHcxaHdweCJ9.igAic2Z7pSjJUmtuulWnWA'
  width={window.innerWidth} height={window.innerHeight} />
}

