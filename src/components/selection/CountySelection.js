import React, { useContext, useRef } from 'react'
import { DataContext } from '../data/DataProvider'

export const CountySelection = ({countrySelected, stateSelected, setCountySelected}) => {
    const {timeSeriesUSA} = useContext(DataContext)
    const county = useRef()

    const handleCountyChange = (event) => {
        setCountySelected(event.target.value)
    }
    if (countrySelected === 'US' && stateSelected !== '') {
        const countiesForState = []
        timeSeriesUSA.forEach(place => {
            if(place['Province_State'] === stateSelected) {
                countiesForState.push(place['Admin2'])
            }
        })
        return (
            <form>
                <select
                    defaultValue=''
                    name='County'
                    ref={county}
                    onChange={handleCountyChange}
                >
                    <option value=''>County</option>
                    {countiesForState.map(county => {
                        return <option key={county} value={county}>{county}</option>
                    })}
                </select>
            </form>
        )
    }
    else {
        return <div></div>
    }
}