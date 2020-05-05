import React from 'react'
import { CountrySelection } from '../selection/CountrySelection'
import { StateSelection } from '../selection/StateSelection'
import { CountySelection } from '../selection/CountySelection'

export const AllSelections = (props) => (
    <div>
        <CountrySelection 
            setCountrySelected={props.setCountrySelected}
            stateSelected={props.stateSelected} setStateSelected={props.setStateSelected}
            countySelected={props.countySelected} setCountySelected={props.setCountySelected}/>
        <StateSelection 
            countrySelected={props.countrySelected}
            setStateSelected={props.setStateSelected}
            countySelected={props.countySelected} setCountySelected={props.setCountySelected}/>
        <CountySelection 
            countrySelected={props.countrySelected}
            stateSelected={props.stateSelected}
            setCountySelected={props.setCountySelected}/>
    </div>
)