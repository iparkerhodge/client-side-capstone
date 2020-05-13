import React, { useContext } from 'react'
import { DataContext } from '../data/DataProvider'
import { DateContext } from '../data/DateCalculator'

export const geoJSONContext = React.createContext()

export const CreateGeoJSON = (props) => {

    const {timeSeriesGlobal} = useContext(DataContext)
    const {allDateArray} = useContext(DateContext)

    const latest = allDateArray.slice(-1)[0]

    const data = []
    const names = []

    //push Province or Country Name to array
    timeSeriesGlobal.forEach(datum => {
        if(datum['Province/State'] !== '') {
            names.push(datum['Province/State'])
        }
        else {
            names.push(datum['Country/Region'])
        }
    })

    timeSeriesGlobal.forEach((datum, i) => {
        data.push({
            type: 'Feature',
            properties: {
                name: names[i],
                date: latest,
                totalCases: datum[latest]
            },
            geometry: {
                type: 'Point',
                coordinates: [datum['Long'], datum['Lat']]
            }
        })
    })

    const geoJSON = {
        type: 'FeatureCollection',
        features: data
    }

    return (
        <geoJSONContext.Provider value={{
            geoJSON, timeSeriesGlobal, allDateArray
        }}>
            {props.children}
        </geoJSONContext.Provider>
    )
}