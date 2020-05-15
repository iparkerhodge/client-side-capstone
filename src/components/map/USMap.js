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

const USAMap = () => {
    return (
        <Provider store={store}>
            <Map />
        </Provider>)
}

export default USAMap

const width = '80vw'
const height = '80vh'

const Map = (props) => {
    const dispatch = useDispatch()
    const { USAData } = useContext(JSONContext)
    console.log(USAData)
    
    useEffect(() => {
        if (USAData) {
            dispatch(
                addDataToMap({
                    datasets: {
                        info: {
                            label: 'COVID-19 USA',
                            id: 'covid19_usa'
                        },
                        data: USAData
                    },
                    option: {
                        centerMap: true,
                        readOnly: true
                    },
                    config: {}
                })
            )
        }
    }, [dispatch, USAData])

    return <KeplerGl id='usa' mapboxApiAccessToken='pk.eyJ1IjoicGFya2VyaG9kZ2UiLCJhIjoiY2thMmtwYnlkMDc1bTNmbmR3bHcxaHdweCJ9.igAic2Z7pSjJUmtuulWnWA'
        width={window.innerWidth} height={window.innerHeight} />
}