import React, { useState, useEffect } from 'react'
import { Menu } from 'antd'
import 'antd/dist/antd.css'
import { GlobalTotalByDate } from './GlobalTotalByDate'
import { TotalCasesSelect } from './TotalCasesSelect'
import { PercentChangeSelect } from './PercentChangeSelect'
import { MovingAverageSelect } from './MovingAverageSelect'
import './Charts.css'


const ChartList = ({ setActiveView }) => {
    const [page, setPage] = useState(1)
    const [components, setComponents] = useState()

    const showGlobalTotalByDate = (
        <div className="globalTotal">
            <GlobalTotalByDate />
        </div>
    )

    const showTotalCasesSelect = (
        <div className="selectableGraph">
            <TotalCasesSelect setActiveView={setActiveView} />
        </div>
    )

    const showPercentChangeSelect = (
        <div className="percentChangeGraph">
            <PercentChangeSelect setActiveView={setActiveView} />
        </div>
    )

    const showMovingAverageSelect = (
        <div className="movingAverageGraph">
            <MovingAverageSelect setActiveView={setActiveView} />
        </div>
    )

    useEffect(() => {
        if (page === 0) {
            setComponents(showGlobalTotalByDate)
        }
        else if (page === 1) {
            setComponents(showTotalCasesSelect)
        }
        else if (page === 2) {
            setComponents(showPercentChangeSelect)
        }
        else if (page === 3) {
            setComponents(showMovingAverageSelect)
        }
    }, [page])

    return (
        <div className="chartListContainer">
            <Menu mode='horizontal' className='chartMenu'>
                <Menu.Item key={1} onClick={() => setPage(1)}>Confirmed Cases</Menu.Item>
                <Menu.Item key={2} onClick={() => setPage(2)}>% Change in Total Confirmed</Menu.Item>
                <Menu.Item key={3} onClick={() => setPage(3)}>New Cases</Menu.Item>
            </Menu>
            {components}
        </div>
    )
}

export default ChartList

