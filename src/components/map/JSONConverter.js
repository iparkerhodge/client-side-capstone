import React, { useContext, useEffect, useState } from 'react'
import { DataContext } from '../data/DataProvider'
import { DateContext } from '../data/DateCalculator'
import { format } from 'date-fns'

export const JSONContext = React.createContext()

export const CreateJSON = (props) => {

    //GLOBAL
    const { timeSeriesGlobal } = useContext(DataContext)
    const { allDateArray } = useContext(DateContext)

    //defining start and end to be used for time range in map config
    const unformattedEnd = allDateArray.slice(-1)[0]
    const end = new Date(unformattedEnd) - 18000000
    const start = end - 86400000

    const formatDate = (date) => {
        return format(new Date(date), 'yyyy-MM-dd KK:mm:ss')
    }

    const deconstructedGlobal = []

    timeSeriesGlobal.forEach(datum => {
        allDateArray.map(day => {
            deconstructedGlobal.push([datum['Country/Region'], datum['Province/State'], formatDate(day), +(datum['Lat']), +(datum['Long']), +(datum[day])])
        })
    })

    const globalData = {
        fields: [
            { name: 'country', format: '', type: 'string' },
            { name: 'state', format: '', type: 'string' },
            { name: 'day', format: 'YYYY-M-D H:m:s', type: 'timestamp' },
            { name: 'latitude', format: '', type: 'real' },
            { name: 'longitude', format: '', type: 'real' },
            { name: 'count', format: '', type: 'integer' },
        ],
        rows: deconstructedGlobal
    }

    //USA
    const { timeSeriesUSA } = useContext(DataContext)
    const [USAData, setUSAData] = useState({})
    const [deconstructedUSA, setDeconstructedUSA] = useState()

    const deconstructed = []

    const latest = allDateArray.slice(-1)[0]

    // timeSeriesUSA.forEach(datum => {
    //     allDateArray.map(day => {
    //         deconstructed.push([datum['Province_State'], datum['Admin2'], formatDate(day), +(datum['Lat']), +(datum['Long_']), +(datum[day])])
    //     })
    // })

    timeSeriesUSA.forEach(datum => {
        deconstructed.push([datum['Province_State'], datum['Admin2'], formatDate(latest), +(datum['Lat']), +(datum['Long_']), +(datum[latest])])
    })

    useEffect(() => {
        setDeconstructedUSA(deconstructed)
    }, [timeSeriesUSA])

    useEffect(() => {

        const data = {
            fields: [
                { name: 'state', format: '', type: 'string' },
                { name: 'county', format: '', type: 'string' },
                { name: 'day', format: 'YYYY-M-D H:m:s', type: 'timestamp' },
                { name: 'latitude', format: '', type: 'real' },
                { name: 'longitude', format: '', type: 'real' },
                { name: 'count', format: '', type: 'integer' },
            ],
            rows: deconstructedUSA
        }

        setUSAData(data)

    }, [deconstructedUSA])

    return (
        <JSONContext.Provider value={{
            globalData, USAData, start, end
        }}>
            {props.children}
        </JSONContext.Provider>
    )
}