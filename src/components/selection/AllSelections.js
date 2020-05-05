import React, { useState } from 'react'
import { CountrySelection } from '../selection/CountrySelection'
import { StateSelection } from '../selection/StateSelection'
import { CountySelection } from '../selection/CountySelection'

export const AllSelections = () => {
    const [countrySelected, setCountrySelected] = useState('')
    const [stateSelected, setStateSelected] = useState('')
    const [countySelected, setCountySelected] = useState('')

    if(countySelected !== '') {
        console.log(`You have selected ${countySelected} county.`)
    }

    return (
        <div>
            <CountrySelection setCountrySelected={setCountrySelected}/>
            <StateSelection 
                countrySelected={countrySelected}
                setStateSelected={setStateSelected}/>
            <CountySelection 
                countrySelected={countrySelected}
                stateSelected={stateSelected}
                setCountySelected={setCountySelected}/>
        </div>
    )

}