import React, { useContext } from 'react'
import { DataContext } from '../data/DataProvider'
import { DateContext } from '../data/DateCalculator'
import { format } from 'date-fns'

export const JSONContext = React.createContext()

export const CreateJSON = (props) => {

    const { timeSeriesGlobal } = useContext(DataContext)
    const { allDateArray } = useContext(DateContext)

    const formatDate = (date) => {
        return format(new Date(date), 'yyyy-MM-dd KK:mm:ss')
    }

    const deconstructed = []

    timeSeriesGlobal.forEach(datum => {
        allDateArray.map(day => {
            deconstructed.push([datum['Country/Region'], datum['Province/State'], formatDate(day), +(datum['Lat']), +(datum['Long']), datum[day]])
        })
    })

    const data = {
        fields: [
            {name: 'country', format: '', type: 'string'},
            {name: 'state', format: '', type: 'string'},
            {name: 'day', format: 'YYYY-M-D H:m:s', type: 'timestamp'},
            {name: 'latitude', format: '', type: 'real'},
            {name: 'longitude', format: '', type: 'real'},
            {name: 'count', format: '', type: 'integer'},
        ],
        rows: deconstructed
    }

    const formattedJSON = data

    //push Province or Country Name to array


    return (
        <JSONContext.Provider value={{
            formattedJSON
        }}>
            {props.children}
        </JSONContext.Provider>
    )
}