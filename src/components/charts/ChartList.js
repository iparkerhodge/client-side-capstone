import React from 'react'
import { DataProvider } from '../data/DataProvider'
import { GlobalTotalByDate } from './GlobalTotalByDate'
import './Charts.css'
import { BarGraph } from './BarGraph'
import { DateProvider } from '../data/DateCalculator'
import { SelectableBarGraph } from './SelectableBarGraph'

const ChartList = () => (
    <DataProvider>
        <DateProvider>
            <div className="chartListContainer">
                <div className="globalTotal">
                    <GlobalTotalByDate />
                </div>
            <div className="selectableGraph">
                <SelectableBarGraph />
            </div>
            </div>
        </DateProvider>
    </DataProvider>
)

export default ChartList