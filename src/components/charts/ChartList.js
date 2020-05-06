import React from 'react'
import { DataProvider } from '../data/DataProvider'
import { GlobalTotalByDate } from './GlobalTotalByDate'
import './Charts.css'
import { DateProvider } from '../data/DateCalculator'
import { SelectableBarGraph } from './SelectableBarGraph'
import { PercentChangeGraph } from './PercentChangeGraph'

const ChartList = ({setActiveView}) => (
    <DataProvider>
        <DateProvider>
            <div className="chartListContainer">
                <div className="globalTotal">
                    <GlobalTotalByDate />
                </div>
                <div className="selectableGraph">
                    <SelectableBarGraph setActiveView={setActiveView}/>
                </div>
                <div className="percentChangeGraph">
                    <PercentChangeGraph setActiveView={setActiveView}/>
                </div>
            </div>
        </DateProvider>
    </DataProvider>
)

export default ChartList