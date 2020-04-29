import React from 'react'
import {ReactComponent as DashboardIcon} from '../../images/Dashboard.svg'
import {ReactComponent as ChartsIcon} from '../../images/charts.svg'
import './Navigation.css'

const LeftNav = ({setActiveView}) => (
    <aside className="leftNav">
        <div className="nav__dashboard" onClick={() => setActiveView('dashboard')}>
            <DashboardIcon className="nav__dashboardIcon" />
            <div className="nav__dashboardText">User's Dashboard</div>
        </div>
        <div className="nav__charts" onClick={() => setActiveView('charts')}>
            <ChartsIcon className="nav__chartsIcon" />
            <div className="nav__chartsText">Charts</div>
        </div>
    </aside>
)

export default LeftNav