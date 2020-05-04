import React, { useState } from 'react'
import { VictoryBar, VictoryChart } from 'victory'
import { CountrySelection } from '../selection/CountrySelection'
import { StateSelection } from '../selection/StateSelection'

export const SelectableBarGraph = () => {
    const [countrySelected, setCountrySelected] = useState('')
    const [stateSelected, setStateSelected] = useState('')

    return (
        <div>
            <CountrySelection setCountrySelected={setCountrySelected}/>
            <StateSelection 
                countrySelected={countrySelected}
                setStateSelected={setStateSelected}/>
            <VictoryChart domainPadding={20}>
                <VictoryBar />
            </VictoryChart>
        </div>
    )
}