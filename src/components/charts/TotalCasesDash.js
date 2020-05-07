import React, { useContext } from 'react'
import { VictoryBar, VictoryChart, VictoryAxis, createContainer } from 'victory'
import { DataContext } from '../data/DataProvider'
import { DateContext } from '../data/DateCalculator'

export const TotalCasesDash = ({country, state, county}) => {
    const countrySelected = country
    const stateSelected = state
    const countySelected = county

    const { timeSeriesGlobal } = useContext(DataContext) || []
    const {timeSeriesUSA} = useContext(DataContext) || []
    const {allDateArray} = useContext(DateContext) || []

    let data = [{date:"1/21/20", cases: 0}]

    const findData = () => {
        if(countySelected !== '') {
            //push county data to data array
            //loop through time series data and return the object that matches the county
            const countyListArray = timeSeriesUSA.filter(obj => obj['Province_State'] === stateSelected) || []
            const countyObject = countyListArray.find(obj => obj['Admin2'] === countySelected) || {}

            const countyTotalsArray = []
            //for each day, push the total for that day to the totals array
            allDateArray.forEach(day => {
                countyTotalsArray.push(+(countyObject[day]))
            })

            const dataForThisSelection = []

            allDateArray.forEach((v,i) => {
                const obj = {}
                obj.date = v
                obj.cases = countyTotalsArray[i]
                dataForThisSelection.push(obj)
            })

            data = dataForThisSelection
        }
        else if (stateSelected !== '') {
            //push state/province data to data array
            if (countrySelected === 'US') {
                const countyListArray = timeSeriesUSA.filter(obj => obj['Province_State'] === stateSelected)
                const stateTotalsArray = []

                const totalForDate = (date) => {
                    let total = 0
                    countyListArray.map(count => {
                        return total += +(count[date])
                    })
                    stateTotalsArray.push(total)
                }

                const dataForThisSelection = []
                allDateArray.map(date => totalForDate(date))

                allDateArray.forEach((v,i) => {
                    const obj = {}
                    obj.date = v
                    obj.cases = stateTotalsArray[i]
                    dataForThisSelection.push(obj)
                })

                data = dataForThisSelection
            }
            else {
                const provinceListArray = timeSeriesGlobal.filter(obj => obj['Country/Region'] === countrySelected)
                const provinceObject = provinceListArray.find(obj => obj['Province/State'] === stateSelected)

                const provinceTotalsArray = []
                allDateArray.forEach(day => {
                    provinceTotalsArray.push(+(provinceObject[day]))
                })
                
                const dataForThisSelection = []

                allDateArray.forEach((v,i) => {
                    const obj = {}
                    obj.date = v
                    obj.cases = provinceTotalsArray[i]
                    dataForThisSelection.push(obj)
                })

                data = dataForThisSelection
            }

        }
        else if (countrySelected !== '') {
            //push country data to data array
            const arrayOfCountriesThatBelongToOtherCountries = []
            timeSeriesGlobal.forEach(place => {
                if(place['Province/State'] !== '') {
                    arrayOfCountriesThatBelongToOtherCountries.push(place['Province/State'])
                }
            })
            if (countrySelected === 'Canada' || countrySelected === 'China' || countrySelected === 'Australia') {
                const provinceListArray = timeSeriesGlobal.filter(obj => obj['Country/Region'] === countrySelected)

                const arrayOfTotalsForEachDay = []

                const totalForDate = (date) => {
                    let total = 0
                    provinceListArray.map(prov => {
                        return total += +(prov[date]) //<- string converted to number
                    })
                    arrayOfTotalsForEachDay.push(total)
                }

                allDateArray.map(date => totalForDate(date))

                const dataForThisSelection = []
                
                allDateArray.forEach((v,i) => {
                    const obj = {}
                    obj.date = v
                    obj.cases = arrayOfTotalsForEachDay[i]
                    dataForThisSelection.push(obj)
                })

                data = dataForThisSelection
            }
            else if (arrayOfCountriesThatBelongToOtherCountries.includes(countrySelected)){
                const countryObject = timeSeriesGlobal.find(c => c['Province/State'] === countrySelected)

                const countryTotalsArray = []
                allDateArray.forEach(day => {
                    countryTotalsArray.push(+(countryObject[day]))
                })

                const dataForThisSelection = []

                allDateArray.forEach((v,i) => {
                    const obj = {}
                    obj.date = v
                    obj.cases = countryTotalsArray[i]
                    dataForThisSelection.push(obj)
                })

                data = dataForThisSelection
            }
            else {
                const countryObject = timeSeriesGlobal.find(c => c['Country/Region'] === countrySelected)

                const countryTotalsArray = []
                allDateArray.forEach(day => {
                    countryTotalsArray.push(+(countryObject[day]))
                })

                const dataForThisSelection = []

                allDateArray.forEach((v,i) => {
                    const obj = {}
                    obj.date = v
                    obj.cases = countryTotalsArray[i]
                    dataForThisSelection.push(obj)
                })

                data = dataForThisSelection
            }
        }
        else {
            //push global data to data array
            const arrayOfTotalsForEachDay = []

            const totalForDate = (date) => {
                let total = 0
                timeSeriesGlobal.map(prov => {
                    return total += +(prov[date]) //<- string converted to number
                })
                arrayOfTotalsForEachDay.push(total)
            }

            allDateArray.map(date => totalForDate(date))

            const dataForNoSelection = []

            allDateArray.forEach((v,i) => {
                const obj = {}
                obj.date = v
                obj.cases = arrayOfTotalsForEachDay[i]
                dataForNoSelection.push(obj)
            })

            data = dataForNoSelection
        }
    }

    findData()

    const VictoryZoomVoronoiContainer = createContainer("zoom", "voronoi")

    const formatNumber = (n) => {
        const mToK = n/1000
        if(mToK >= 1000) {
            return `${mToK/1000}M`
        }
        else {
            return `${mToK}K`
        }
    }

    const chartHeader = () => {
        if(countySelected) {
            return `Confirmed Cases: ${countrySelected} - ${stateSelected} - ${countySelected}`
        }
        else if(stateSelected) {
            return `Confirmed Cases: ${countrySelected} - ${stateSelected}`
        }
        else if(countrySelected) {
            return `Confirmed Cases: ${countrySelected}`
        }
        else {
            return `Confirmed Cases: Global`
        }
    }

    return (
        <div className="Chart">
            <div className="chartHeader">{chartHeader()}</div>
            <VictoryChart
                height={600}
                width={900}
                containerComponent={
                <VictoryZoomVoronoiContainer responsive={false}
                    labels={({datum}) => `Date: ${datum.date}
                    cases: ${datum.cases}`}
                />
            }>
                <VictoryAxis tickCount={10} />
                <VictoryAxis dependentAxis tickCount={5} tickFormat={(n) => formatNumber(n)} />
                <VictoryBar 
                    data={data}
                    style={{
                        data: {fill: '#F47E17', stroke: 'white', strokeWidth: 1}
                    }}
                    x="date"
                    y="cases"
                    barRatio={1}
                    />
            </VictoryChart>
        </div>
    )
}