import React, { useContext, useState } from 'react'
import { VictoryBar, VictoryChart, VictoryAxis,
        VictoryBrushContainer, createContainer } from 'victory'
import { DataContext } from '../data/DataProvider'
import { DateContext } from '../data/DateCalculator'

export const BarGraph = () => {
    const { timeSeriesGlobal } = useContext(DataContext)
    const { allDateArray } = useContext(DateContext)

    //define an empty array to hold dependent variable
    const arrayOfTotalsForEachDay = []

    //write a function that takes input independent v - date -  and pushes dependent to its array
    const totalForDate = (date) => {
        let total = 0
        timeSeriesGlobal.map(prov => {
            return total += +(prov[date]) //<- string converted to number
        })
        arrayOfTotalsForEachDay.push(total)
    }

    //map independent and convert to dependent
    allDateArray.map(date => totalForDate(date))

    //combine indp and dp arrays to form an object for each data point {date:'4/30/20, cases:'2000000'}
    const data = [{date:"1/21/20", cases: 0}]   //for some reason this cannot be empty??
    allDateArray.forEach((v,i) => {
        const obj = {}
        obj.date = v
        obj.cases = arrayOfTotalsForEachDay[i]
        data.push(obj)
    })

    //format numbers on the axis (3,000,000 -> 3M; 500,000 -> 500k)
    const formatNumber = (n) => {
        const mToK = n/1000
        if(mToK >= 1000) {
            return `${mToK/1000}M`
        }
        else {
            return `${mToK}K`
        }
    }

    const formatDate = (date) => {
        const newDate = date.substring(0, date.length-3)
        return newDate
    }

    const VictoryZoomVoronoiContainer = createContainer("zoom", "voronoi")

    const [selectedDomain, setSelectedDomain] = useState()
    const [zoomDomain, setZoomDomain] = useState()

    const handleZoom = (domain) => {
        setSelectedDomain(domain)
    }

    const handleBrush = (domain) => {
        setZoomDomain(domain)
    }

    return (
        <div>
            <div>Global: Confirmed Cases</div>
            <VictoryChart
            height={600}
            width={900}
            containerComponent={
                <VictoryZoomVoronoiContainer responsive={false}
                    allowPan={false}
                    zoomDomain={zoomDomain}
                    onZoomDomainChange={handleZoom}
                    labels={({datum}) => `Date: ${datum.date}
                    cases: ${datum.cases}`}
                />
            }>
                <VictoryAxis tickCount={10} tickFormat={(d) => formatDate(d)} />
                <VictoryAxis dependentAxis tickCount={5} tickFormat={(n) => formatNumber(n)} />
                <VictoryBar 
                    data={data}
                    style={{
                        data: {fill: '#F47E17', stroke: 'white', strokeWidth: 1}
                    }}
                    x="date"
                    y="cases"
                    barRatio={2}
                    cornerRadius={5}
                    />
            </VictoryChart>

            <VictoryChart
            height={200}
            width={900}
            domainPadding={ {x: [0, 15], y: 0}}
            padding={{top: 0, left: 50, right: 50, bottom: 30}}
                containerComponent={
                    <VictoryBrushContainer responsive={false}
                        brushDomain={selectedDomain}
                        onBrushDomainChange={handleBrush}/>
                }
            >
                <VictoryAxis tickCount={10} tickFormat={(d) => formatDate(d)} label={"Date"}/>
                <VictoryBar 
                    data={data}
                    style={{
                        data: {fill: '#F47E17'}
                    }}
                    x="date"
                    y="cases"
                    barRatio={4}
                    cornerRadius={5}
                />
            </VictoryChart>
        </div>
        )
}