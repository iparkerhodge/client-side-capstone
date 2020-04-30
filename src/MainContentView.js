import React, { useState, useEffect } from 'react'
import { Auth } from './components/login/Auth'
import Dashboard from './components/dashboard/Dashboard'
import ChartList from './components/charts/ChartList'

const MainContent = ({activeView}) => {
    const [check, update] = useState(false)
    const toggleLogin = () => update(!check)

    const [components, setComponents] = useState()

    const showDashboard = () => (
        <Dashboard />
    )

    const showCharts = () => (
        <div>
            <ChartList />
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