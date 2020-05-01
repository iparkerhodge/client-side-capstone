import React from 'react'
import { DataProvider } from '../data/DataProvider'
import { GlobalTotalByDate } from './GlobalTotalByDate'
import './Charts.css'
import { BarGraph } from './BarGraph'
import { DateProvider } from '../data/DateCalculator'

const ChartList = () => (
    <DataProvider>
        <DateProvider>
            <GlobalTotalByDate />
            <BarGraph />
        </DateProvider>
    </DataProvider>
)

export default ChartList