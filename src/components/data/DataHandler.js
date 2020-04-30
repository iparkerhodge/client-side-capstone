import React, { useContext } from 'react'
import { DataContext } from './DataProvider'
import { format,subDays } from 'date-fns'


const { timeSeriesGlobal } = useContext(DataContext)


//GLOBAL TOTAL for yesterday
const yesterday = format(subDays(new Date(), 1), 'M/d/yy')

timeSeriesGlobal.map(prov => {
    return totalGlobalYesterday += parseInt(prov[`${yesterday}`])
})

console.log(totalGlobalYesterday)