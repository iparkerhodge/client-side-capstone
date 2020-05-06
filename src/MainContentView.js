import React, { useState, useEffect } from 'react'
import { Auth } from './components/login/Auth'
import Dashboard from './components/dashboard/Dashboard'
import ChartList from './components/charts/ChartList'
import './MainContent.css'

const MainContent = ({activeView, leftNav, setActiveView}) => {
    const [check, update] = useState(false)
    const toggleLogin = () => update(!check)

    const [components, setComponents] = useState()

    const checkLeftNavOut = () => {
        if(leftNav){
            return 'mainContentContainer--leftNavOut'
        }
        else {
            return 'mainContentContainer'
        }
    }

    const showDashboard = () => (
        <div className={checkLeftNavOut()}>
        <Dashboard />
        </div>
    )

    const showCharts = () => (
        <div className={checkLeftNavOut()}>
            <ChartList setActiveView={setActiveView}/>
        </div>
    )

        useEffect(() => {
            if(activeView === 'dashboard') {
                setComponents(showDashboard)
            }
            else if (activeView === 'charts'){
                setComponents(showCharts)
            }
        }, [activeView])

    if (sessionStorage.getItem("user")) {
        return(
            <>
                {components}
            </>
        )
    }
    else {
        return (
            <Auth toggleLogin={toggleLogin} />
        )
    }
}

export default MainContent