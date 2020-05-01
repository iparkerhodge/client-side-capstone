import React, { useState, useEffect } from 'react'
import { format, formatDistanceStrict, subDays, addDays } from 'date-fns'

export const DateContext = React.createContext()

export const DateProvider = (props) => {
    const [allDateArray, setAllDates] = useState([])

    const calculateAllDates = () => {
        const distanceFromDay0 = formatDistanceStrict(
            subDays(new Date(), 1),
            new Date(2020, 0, 22),
            { unit: 'day' }
        )

        const [distanceNumberString, _] = distanceFromDay0.split(' ')
        const distanceNumber = parseInt(distanceNumberString)
        
        let allDates = []
        let i
        for (i = 0; i < (distanceNumber); i++) {
            const day = format(addDays(new Date(2020, 0, 22), i), "M/d/yy")
        
            allDates.push(day)
        }

        setAllDates(allDates)
    }

    useEffect(() => {
        calculateAllDates()
    }, [])

    return (
        <DateContext.Provider value={{
            allDateArray
        }}>
            {props.children}
        </DateContext.Provider>
    )
}
