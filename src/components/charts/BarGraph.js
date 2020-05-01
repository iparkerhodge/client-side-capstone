import React, { useContext } from 'react'
import { select, selectAll } from 'd3'
import { DataContext } from '../data/DataProvider'
import { DateContext } from '../data/DateCalculator'

export const BarGraph = () => {
    const { timeSeriesGlobal } = useContext(DataContext)
    const { allDateArray } = useContext(DateContext)

    //get global total for each day
    const arrayOfTotalsForEachDay = []

    //write a function that takes input date and pushes the global total to array
    const totalForDate = (date) => {
        let total = 0
        timeSeriesGlobal.map(prov => {
            return total += +(prov[date])
        })
        arrayOfTotalsForEachDay.push(total)
    }

    //map date array and convert each date to a total
    allDateArray.map(date => totalForDate(date))

    //turn into object {date:'4/30/20, cases:'2000000'}
    const data = []
    allDateArray.forEach((v,i) => {
        const obj = {}
        obj.date = v
        obj.cases = arrayOfTotalsForEachDay[i]
        data.push(obj)
    })

    console.log(data)

    //render bar chart
    const render = () => {
        svg.selectAll('rect')

    }

    const svg = select('svg')
    const width = +svg.attr('width')
    const height = +svg.attr('height')

    return (
        <div className="barGraph">
        <svg width="960" height="500"></svg>
        </div>
    )
}