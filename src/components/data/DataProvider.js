import React, { useState, useEffect } from 'react'
import * as d3 from 'd3'

export const DataContext = React.createContext()

export const DataProvider = (props) => {
    const [timeSeriesGlobal, setTimeSeriesGlobal] = useState([])
    const [timeSeriesUSA, setTimeSeriesUSA] = useState([])
    const [dailyReport, setDailyReport] = useState([])

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

    const getDailyReport = (date) => {
        return fetch(`https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports_us/${date}.csv`)
        .then(resp => resp.text())
        .then(text => d3.csvParse(text))
        .then(setDailyReport)
    }

    useEffect(() => {
        getData()
        getUSAData()
    }, [])
    
    return(
        <DataContext.Provider value={{
            getData, timeSeriesGlobal, timeSeriesUSA, getDailyReport, dailyReport
        }}>
            {props.children}
        </DataContext.Provider>
    )
}