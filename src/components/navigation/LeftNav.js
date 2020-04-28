import React from 'react'
import {ReactComponent as DashboardIcon} from '../../images/Dashboard.svg'
import './Navigation.css'

const LeftNav = () => (
    <aside class="leftNav">
        <div className="nav__dashboard">
            <DashboardIcon className="nav__dashboardIcon"/>
            <div className="nav__dashboardText">User's Dashboard</div>
        </div>
    </aside>
)

export default LeftNav