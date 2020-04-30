import React, { useContext, useState } from 'react'
import { DataContext } from '../data/DataProvider'
import { format, formatDistanceStrict, subDays, addDays } from 'date-fns'

export const GlobalTotalByDate = () => {
    const {timeSeriesGlobal} = useContext(DataContext)

    //figure out how many days between 1/22/20 and yesterday and convert to number
    const distanceFromDay0 = formatDistanceStrict(
        subDays(new Date(), 1),
        new Date(2020, 0, 22),
        { unit: 'day' }
    ) //returns '68 days'

    const [distanceNumberString, _] = distanceFromDay0.split(' ')
    const distanceNumber = parseInt(distanceNumberString)

    //for everday from 1/22/20 to yesterday show an <option /> in a <select />
    let arrayOfOptions = []

    const generateOptions = () => {
        let i
        for (i = 0; i < (distanceNumber - 1); i++) {

            const day = format(addDays(new Date(2020, 0, 22), i), "M/d/yy")
    
            arrayOfOptions.push(
                <option key={i} value={day}>{day}</option>
            )
        }
    }
    generateOptions()

    const yesterday = format(subDays(new Date(), 1), "M/d/yy")
    const [date, setDate] = useState(yesterday)

    const changeDate = (event) => {
        const newDate = event.target.value
        if(newDate !== "0"){
        setDate(newDate)
        }
    }

    const totalForDate = () => {
        let total = 0
        timeSeriesGlobal.map(prov => {
            return total += parseInt(prov[`${date}`])
        })
        return total
    }

    return (
        <div className="globalTotalByDate">
            <div>Global Total for
            <select onChange={changeDate}>
                <option value="0">{yesterday}</option>
                {arrayOfOptions}
            </select>
            </div>
            <div>{totalForDate()} Cases</div>
        </div>
    )
}