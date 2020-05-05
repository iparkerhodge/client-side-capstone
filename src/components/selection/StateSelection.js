import React, { useContext, useRef } from 'react'
import { DataContext } from '../data/DataProvider'

export const StateSelection = ({countrySelected, setStateSelected}) => {
    const {timeSeriesGlobal} = useContext(DataContext)
    const {timeSeriesUSA} = useContext(DataContext)

    //display Australia states
    const australiaStatesArray = []
    timeSeriesGlobal.forEach(region => {
        if (region['Country/Region'] === "Australia") {
            australiaStatesArray.push(region['Province/State']
            )}
    })

    //display Canada provinces
    const canadaProvincesArray = []
    timeSeriesGlobal.forEach(region => {
        if (region['Country/Region'] === "Canada") {
            canadaProvincesArray.push(region['Province/State'])
        }
    })
    //remove 'recovered' data point
    const recoveredIndex = canadaProvincesArray.indexOf('Recovered')
    canadaProvincesArray.splice(recoveredIndex, 1)
    canadaProvincesArray.sort()


    //display China Provinces
    const chinaProvincesArray = []
    timeSeriesGlobal.forEach(region => {
        if (region['Country/Region'] === 'China') {
            chinaProvincesArray.push(region['Province/State'])
        }
    })

    //display US States
    const usStatesWithDuplicates = []
    timeSeriesUSA.forEach(state => {
        usStatesWithDuplicates.push(state['Province_State'])
    })

    const usaStatesArray = Array.from(new Set(usStatesWithDuplicates)).sort()

    const state = useRef()

    const handleStateChange = (event) => {
        setStateSelected(event.target.value)
    }

    if(countrySelected === 'Australia') {
        return (
            <form>
                <select
                    defaultValue=''
                    name='Province/State'
                    ref={state}
                    onChange={handleStateChange}
                >
                    <option value=''>State</option>
                    {australiaStatesArray.map(state => {
                        return <option key={state} value={state}>{state}</option>
                    })}
                </select>
            </form>
        )
    }
    else if (countrySelected === 'Canada') {
        return (
            <form>
                <select
                    defaultValue=''
                    name='Province/State'
                    ref={state}
                    onChange={handleStateChange}
                >
                    <option value=''>Province</option>
                    {canadaProvincesArray.map(province => {
                        return <option key={province} value={province}>{province}</option>
                    })}
                </select>
            </form>
        )
    }
    else if (countrySelected === 'China') {
        return (
            <form>
                <select
                    defaultValue=''
                    name='Province/State'
                    ref={state}
                    onChange={handleStateChange}
                >
                    <option value=''>Province</option>
                    {chinaProvincesArray.map(province => {
                        return <option key={province} value={province}>{province}</option>
                    })}
                </select>
            </form>
        )
    }
    else if (countrySelected === 'US') {
        return (
            <form>
                <select
                    defaultValue=''
                    name='Province/State'
                    ref={state}
                    onChange={handleStateChange}
                >
                    <option value=''>State</option>
                    {usaStatesArray.map(province => {
                        return <option key={province} value={province}>{province}</option>
                    })}
                </select>
            </form>
        )
    }
    else {
        return <div></div>
    }
}