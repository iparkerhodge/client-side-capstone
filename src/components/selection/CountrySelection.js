import React, { useContext, useRef } from 'react'
import { DataContext } from '../data/DataProvider'

export const CountrySelection = ({setCountrySelected}) => {
    const { timeSeriesGlobal } = useContext(DataContext)

    //Create an array of the list of all countries
    const allCountriesArrayWithDuplicates = []
    timeSeriesGlobal.map(place => {
        if (place['Country/Region'] === 'Australia' || place['Country/Region'] === 'Canada' || place['Country/Region'] === 'China') {
            allCountriesArrayWithDuplicates.push(place['Country/Region'])
        }
        else {
            if(place['Province/State'] !== ''){
                allCountriesArrayWithDuplicates.push(place['Province/State'])
            }
            else {
                allCountriesArrayWithDuplicates.push(place['Country/Region'])
            }
        }
    })

    const allCountriesArray = Array.from(new Set(allCountriesArrayWithDuplicates)).sort()

    const country = useRef()

    const handleCountryChange = (event) => {
        setCountrySelected(event.target.value)
    }

    return(
        <form>
            <select
                defaultValue=''
                name='Country/Region'
                ref={country}
                onChange={handleCountryChange}>
                    <option value=''>Country/Region</option>
                    {allCountriesArray.map(country => {
                        return <option key={country} value={country}>{country}</option>
                    })}
            </select>
        </form>
    )
}