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

const LoginMap = () => {
  return (
    <Provider store={store}>
      <Map />
    </Provider>)
}

export default LoginMap

const Map = (props) => {
  const dispatch = useDispatch()
  const { globalData } = useContext(JSONContext)
  const { USAData } = useContext(JSONContext)

  useEffect(() => {
    if (globalData) {
      dispatch(
        addDataToMap({
          datasets: {
            info: {
              label: 'COVID-19 Global',
              id: 'covid19_global'
            },
            data: globalData
          },
          option: {
            centerMap: false,
            readOnly: true
          },
          config: config
        })
      )
    }
  }, [dispatch, globalData])

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
                    centerMap: false,
                    readOnly: true
                },
                config: {}
            })
        )
    }
}, [dispatch, USAData])

  return <KeplerGl id='login' mapboxApiAccessToken='pk.eyJ1IjoicGFya2VyaG9kZ2UiLCJhIjoiY2thMmtwYnlkMDc1bTNmbmR3bHcxaHdweCJ9.igAic2Z7pSjJUmtuulWnWA'
    width={window.innerWidth} height={window.innerHeight} />
}

const config =
{
    "version": "v1",
    "config": {
      "visState": {
        "filters": [
          {
            "dataId": [
              "covid19_global"
            ],
            "id": "i8mx62ht9",
            "name": [
              "day"
            ],
            "type": "timeRange",
            "value": [
              1589155200000,
              1589241600000
            ],
            "enlarged": true,
            "plotType": "histogram",
            "yAxis": null
          }
        ],
        "layers": [
          {
            "id": "iab9p35",
            "type": "point",
            "config": {
              "dataId": "covid19_usa",
              "label": "Point",
              "color": [
                24,
                38,
                77
              ],
              "columns": {
                "lat": "latitude",
                "lng": "longitude",
                "altitude": null
              },
              "isVisible": true,
              "visConfig": {
                "radius": 51.7,
                "fixedRadius": false,
                "opacity": 0.25,
                "outline": false,
                "thickness": 99.8,
                "strokeColor": [
                  24,
                  38,
                  77
                ],
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
                  0,
                  146.4
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
          },
          {
            "id": "kwf57su",
            "type": "point",
            "config": {
              "dataId": "covid19_global",
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
                  0,
                  300.8
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
              "covid19_global": [
                "country",
                "state",
                "day",
                "count"
              ],
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
        "latitude": 8.557399915427105,
        "longitude": 20.53420345759785,
        "pitch": 0,
        "zoom": 1.8180832729656744,
        "isSplit": false
      },
      "mapStyle": {
        "styleType": "muted",
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
          224.4071295378559,
          224.4071295378559,
          224.4071295378559
        ],
        "mapStyles": {}
      }
    }
  }