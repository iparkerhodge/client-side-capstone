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
                    config: config
                })
            )
        }
    }, [dispatch, USAData])

    return <KeplerGl id='usa' mapboxApiAccessToken='pk.eyJ1IjoicGFya2VyaG9kZ2UiLCJhIjoiY2thMmtwYnlkMDc1bTNmbmR3bHcxaHdweCJ9.igAic2Z7pSjJUmtuulWnWA'
        width={window.innerWidth} height={window.innerHeight} />
}

const config =
{
    "version": "v1",
    "config": {
      "visState": {
        "filters": [],
        "layers": [
          {
            "id": "4p47zds",
            "type": "point",
            "config": {
              "dataId": "covid19_usa",
              "label": "Point",
              "color": [
                254,
                137,
                26
              ],
              "columns": {
                "lat": "latitude",
                "lng": "longitude",
                "altitude": null
              },
              "isVisible": true,
              "visConfig": {
                "radius": 10,
                "fixedRadius": false,
                "opacity": 0.25,
                "outline": false,
                "thickness": 2,
                "strokeColor": null,
                "colorRange": {
                  "name": "Global Warming",
                  "type": "sequential",
                  "category": "Uber",
                  "colors": [
                    "#5A1846",
                    "#900C3F",
                    "#C70039",
                    "#E3611C",
                    "#F1920E",
                    "#FFC300"
                  ]
                },
                "strokeColorRange": {
                  "name": "Global Warming",
                  "type": "sequential",
                  "category": "Uber",
                  "colors": [
                    "#5A1846",
                    "#900C3F",
                    "#C70039",
                    "#E3611C",
                    "#F1920E",
                    "#FFC300"
                  ]
                },
                "radiusRange": [
                  3,
                  300
                ],
                "filled": true
              },
              "textLabel": [
                {
                  "field": null,
                  "color": [
                    255,
                    255,
                    255
                  ],
                  "size": 18,
                  "offset": [
                    0,
                    0
                  ],
                  "anchor": "start",
                  "alignment": "center"
                }
              ]
            },
            "visualChannels": {
              "colorField": null,
              "colorScale": "quantile",
              "strokeColorField": null,
              "strokeColorScale": "quantile",
              "sizeField": {
                "name": "count",
                "type": "integer"
              },
              "sizeScale": "sqrt"
            }
          }
        ],
        "interactionConfig": {
          "tooltip": {
            "fieldsToShow": {
              "covid19_usa": [
                "state",
                "county",
                "day",
                "count"
              ]
            },
            "enabled": true
          },
          "brush": {
            "size": 0.5,
            "enabled": false
          },
          "coordinate": {
            "enabled": false
          }
        },
        "layerBlending": "normal",
        "splitMaps": [],
        "animationConfig": {
          "currentTime": null,
          "speed": 1
        }
      },
      "mapState": {
        "bearing": 0,
        "dragRotate": false,
        "latitude": 39.98558602934307,
        "longitude": -105.72024322700521,
        "pitch": 0,
        "zoom": 3.7637563807923944,
        "isSplit": false
      },
      "mapStyle": {
        "styleType": "light",
        "topLayerGroups": {},
        "visibleLayerGroups": {
          "label": true,
          "road": true,
          "border": false,
          "building": true,
          "water": true,
          "land": true,
          "3d building": false
        },
        "threeDBuildingColor": [
          218.82023004728686,
          223.47597962276103,
          223.47597962276103
        ],
        "mapStyles": {}
      }
    }
  }