import React, { useContext } from 'react'
import {ReactComponent as DashboardIcon} from '../../images/Dashboard.svg'
import {ReactComponent as ChartsIcon} from '../../images/charts.svg'
import {ReactComponent as MapsIcon} from '../../images/world.svg'
import './Navigation.css'
import { WidgetsContext } from '../data/WidgetProvider'

const LeftNav = ({setActiveView, toggleNav}) => {
    const {toggleShowDelete, showDelete} = useContext(WidgetsContext)

    return(
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
            if(showDelete) {
                toggleShowDelete()
            }
            }}>
            <ChartsIcon className="nav__chartsIcon nav__icon" />
            <div className="nav__chartsText nav__text">Charts</div>
        </div>
        <div className="nav__maps nav__btn" onClick={() => {
            setActiveView('maps')
            toggleNav()
            if(showDelete) {
                toggleShowDelete()
            }
            }}>
            <MapsIcon className="nav__chartsIcon nav__icon" />
            <div className="nav__chartsText nav__text">Maps</div>
        </div>
    </aside>
    )
}

export default LeftNav