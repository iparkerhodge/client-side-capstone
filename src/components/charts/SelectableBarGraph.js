import React from 'react'
import { VictoryBar, VictoryChart } from 'victory'
import { AllSelections } from '../selection/AllSelections'

export const SelectableBarGraph = () => {
    return (
        <div>
            <AllSelections />
            <VictoryChart domainPadding={20}>
                <VictoryBar />
            </VictoryChart>
        </div>
    )
}