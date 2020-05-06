import React, { useState, useContext } from 'react'
import { VictoryBar, VictoryChart, VictoryAxis, createContainer, VictoryLine } from 'victory'
import { AllSelections } from '../selection/AllSelections'
import { DataContext } from '../data/DataProvider'
import { DateContext } from '../data/DateCalculator'
import { WidgetsContext } from '../data/WidgetProvider'

export const PercentChangeGraph = ({setActiveView}) => {
    const {addWidget} = useContext(WidgetsContext)
    const [countrySelected, setCountrySelected] = useState('')
    const [stateSelected, setStateSelected] = useState('')
    const [countySelected, setCountySelected] = useState('')

    const { timeSeriesGlobal } = useContext(DataContext)
    const {timeSeriesUSA} = useContext(DataContext)
    const {allDateArray} = useContext(DateContext)

    const makeNewWidget = () => {
        const widget = {
            userId: +(sessionStorage.getItem("user")),
            graph: "barGraph",
            statistic: "percentChange",
            country: countrySelected,
            state: stateSelected,
            county: countySelected
        }

        addWidget(widget)
        setActiveView('dashboard')
    }

    let data = [{date:"1/21/20", cases: 0}]

    const findData = () => {
        if(countySelected !== '') {
            //push county data to data array
            //loop through time series data and return the object that matches the county
            const countyListArray = timeSeriesUSA.filter(obj => obj['Province_State'] === stateSelected)
            const countyObject = countyListArray.find(obj => obj['Admin2'] === countySelected)

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

    //data => %change
    data.forEach((v, i) => {
        if(i > 0) {
        const old = data[i-1]

        const change = v.cases - old.cases
            if(change === 0) {
                v.percentChange = 0
            }
            else if (old.cases === 0) {
                v.percentChange = 0
            }
            else {
                const percentChange = (change/(Math.abs(old.cases)) * 100)
                v.percentChange = percentChange
        }
        }
        else {
            v.percentChange = 0
        }
    })


    console.log(data)

    const VictoryZoomVoronoiContainer = createContainer("zoom", "voronoi")

    const chartHeader = () => {
        if(countySelected) {
            return `% Change: ${countrySelected} - ${stateSelected} - ${countySelected}`
        }
        else if(stateSelected) {
            return `% Change: ${countrySelected} - ${stateSelected}`
        }
        else if(countrySelected) {
            return `% Change: ${countrySelected}`
        }
        else {
            return `% Change: Global`
        }
    }

    return (
        <div className="Chart">
            <div className="chartHeader">{chartHeader()}</div>
            <div className="btn--addChart" onClick={makeNewWidget}>Add Chart</div>
            <AllSelections 
                countrySelected={countrySelected} setCountrySelected={setCountrySelected}
                stateSelected={stateSelected} setStateSelected={setStateSelected}
                countySelected={countySelected} setCountySelected={setCountySelected}
            />

            <VictoryChart
                height={600}
                width={900}
                containerComponent={
                <VictoryZoomVoronoiContainer responsive={false}
                    labels={({datum}) => `Date: ${datum.date}
                    PercentChange: ${datum.percentChange.toFixed(2)}`}
                />
            }>
                <VictoryAxis tickCount={10} />
                <VictoryAxis dependentAxis tickCount={5} />
                <VictoryBar 
                    data={data}
                    style={{
                        data: {fill: '#F47E17', stroke: 'white', strokeWidth: 1}
                    }}
                    x="date"
                    y="percentChange"
                    barRatio={1}
                />
            </VictoryChart>
        </div>
    )

    return <div></div>
}