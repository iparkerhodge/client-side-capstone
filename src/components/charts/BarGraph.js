import React, { useContext } from 'react'
import { select } from 'd3'
import { DataContext } from '../data/DataProvider'

export const BarGraph = () => {
    const { timeSeriesGlobal } = useContext(DataContext)

    const svg = select('svg')
    const width = +svg.attr('width')
    const height = +svg.attr('height')

    return (
        <div className="barGraph">
        <svg width="960" height="500"></svg>
        </div>
    )
}