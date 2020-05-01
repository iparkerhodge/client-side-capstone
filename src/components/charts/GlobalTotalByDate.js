import React, { useContext, useState } from 'react'
import { DataContext } from '../data/DataProvider'
import { format, subDays } from 'date-fns'
import { DateContext } from '../data/DateCalculator'

export const GlobalTotalByDate = () => {
    const {timeSeriesGlobal} = useContext(DataContext)
    const {allDateArray} = useContext(DateContext)

    let arrayOfOptions = []

    const generateOptions = () => {
        for (const date of allDateArray) {
            arrayOfOptions.push(
                <option key={date} value={date}>{date}</option>
            )
        }
    }
    generateOptions()

    const yesterday = format(subDays(new Date(), 1), "M/d/yy")
    const [selectedDate, setDate] = useState(yesterday)

    const changeDate = (event) => {
        const newDate = event.target.value
        if(newDate !== "0"){
        setDate(newDate)
        }
    }

    const totalForDate = () => {
        let total = 0
        timeSeriesGlobal.map(prov => {
            return total += +(prov[`${selectedDate}`])
        })
        return total
    }

    return (
        <div className="globalTotalByDate">
            <div>Global Total for
            <select onChange={changeDate}>
                <option value={yesterday}>{yesterday}</option>
                {arrayOfOptions}
            </select>
            </div>
            <div>{totalForDate()} Cases</div>
        </div>
    )
}