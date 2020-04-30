import React from 'react'
import { DataProvider } from '../data/DataProvider'
import { GlobalTotalByDate } from './GlobalTotalByDate'
import './Charts.css'

const ChartList = () => (
    <DataProvider>
        <GlobalTotalByDate />
    </DataProvider>
)

export default ChartList