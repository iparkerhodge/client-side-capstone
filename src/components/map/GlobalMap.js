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

const GlobalMap = () => {
  return (
    <Provider store={store}>
      <Map />
    </Provider>)
}

export default GlobalMap

const Map = (props) => {
  const dispatch = useDispatch()
  const { globalData, start, end } = useContext(JSONContext)
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
              start,
              end
            ],
            "enlarged": true,
            "plotType": "histogram",
            "yAxis": null
          }
        ],
        "layers": [
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
        "latitude": 2.315941617980199,
        "longitude": 5.2051821656763035,
        "pitch": 0,
        "zoom": 1.1428929297940322,
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

  return <KeplerGl id='covid' mapboxApiAccessToken='pk.eyJ1IjoicGFya2VyaG9kZ2UiLCJhIjoiY2thMmtwYnlkMDc1bTNmbmR3bHcxaHdweCJ9.igAic2Z7pSjJUmtuulWnWA'
    width={window.innerWidth} height={window.innerHeight} />
}