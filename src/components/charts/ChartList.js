import React from 'react'
import { DataProvider } from '../data/DataProvider'
import { GlobalTotalByDate } from './GlobalTotalByDate'
import './Charts.css'
import { DateProvider } from '../data/DateCalculator'
import { TotalCasesSelect } from './TotalCasesSelect'
import { PercentChangeSelect } from './PercentChangeSelect'
import { MovingAverageSelect } from './MovingAverageSelect'

const ChartList = ({setActiveView}) => (
    <DataProvider>
        <DateProvider>
            <div className="chartListContainer">
                <div className="globalTotal">
                    <GlobalTotalByDate />
                </div>
                <div className="selectableGraph">
                    <TotalCasesSelect setActiveView={setActiveView}/>
                </div>
                <div className="percentChangeGraph">
                    <PercentChangeSelect setActiveView={setActiveView}/>
                </div>
                <div className="movingAverageGraph">
                    <MovingAverageSelect setActiveView={setActiveView}/>
                </div>
            </div>
        </DateProvider>
    </DataProvider>
)

export default ChartList