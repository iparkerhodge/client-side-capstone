import React, { useState, useEffect } from 'react'
import * as d3 from 'd3'

export const DataContext = React.createContext()

export const DataProvider = (props) => {
    const [timeSeriesGlobal, setTimeSeriesGlobal] = useState([])
    const [timeSeriesUSA, setTimeSeriesUSA] = useState([])

    const getData = () => {
        return fetch('https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_global.csv')
        .then(resp => resp.text())
        .then(text => d3.csvParse(text))
        .then(setTimeSeriesGlobal)
    }

    const getUSAData = () => {
        return fetch('https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_US.csv')
        .then(resp => resp.text())
        .then(text => d3.csvParse(text))
        .then(setTimeSeriesUSA)
    }

    useEffect(() => {
        getData()
        getUSAData()
    }, [])
    
    return(
        <DataContext.Provider value={{
            getData, timeSeriesGlobal, timeSeriesUSA
        }}>
            {props.children}
        </DataContext.Provider>
    )
}