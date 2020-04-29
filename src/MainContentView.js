import React, { useState, useEffect } from 'react'
import { Auth } from './components/login/Auth'
import Dashboard from './components/dashboard/Dashboard'
import { DataProvider } from './components/data/DataProvider'

const MainContent = ({activeView}) => {
    const [check, update] = useState(false)
    const toggleLogin = () => update(!check)

    const [components, setComponents] = useState()

    const showDashboard = () => (
        <Dashboard />
    )

    const showCharts = () => (
        <div>
            THESE ARE THE CHARTS
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