import React from 'react'
import {ReactComponent as DashboardIcon} from '../../images/Dashboard.svg'
import {ReactComponent as ChartsIcon} from '../../images/charts.svg'
import './Navigation.css'

const LeftNav = ({setActiveView, toggleNav}) => (
    <aside className="leftNav">
        <div className="nav__dashboard nav__btn" onClick={() => {
            setActiveView('dashboard')
            toggleNav()
            }}>
            <DashboardIcon className="nav__dashboardIcon nav__icon" />
            <div className="nav__dashboardText nav__text">User's Dashboard</div>
        </div>
        <div className="nav__charts nav__btn" onClick={() => {
            setActiveView('charts')
            toggleNav()
            }}>
            <ChartsIcon className="nav__chartsIcon nav__icon" />
            <div className="nav__chartsText nav__text">Charts</div>
        </div>
    </aside>
)

export default LeftNav