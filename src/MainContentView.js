import React, { useState, useEffect } from 'react'
import { Auth } from './components/login/Auth'
import Dashboard from './components/dashboard/Dashboard'
import ChartList from './components/charts/ChartList'
import './MainContent.css'
import { MapList } from './components/map/MapList'

const MainContent = ({activeView, setActiveView}) => {
    const [check, update] = useState(false)
    const toggleLogin = () => update(!check)

    const [components, setComponents] = useState()

    const showDashboard = () => (
        <div className='mainContentContainer' >
        <Dashboard />
        </div>
    )

    const showCharts = () => (
        <div className='mainContentContainer'>
            <ChartList setActiveView={setActiveView}/>
        </div>
    )

    const showMaps = () => (
        <div className='mainContentContainer'>
            <MapList />
        </div>
    )

    const showAuth = () => (
        <Auth toggleLogin={toggleLogin} />
    )

    useEffect(() => {
        if(check) {
            setActiveView('dashboard')
        }
    }, [check])

        useEffect(() => {
            if(activeView === 'dashboard') {
                setComponents(showDashboard)
            }
            else if (activeView === 'charts') {
                setComponents(showCharts)
            }
            else if (activeView === 'maps') {
                setComponents(showMaps)
            }
            else if (activeView === 'login') {
                setComponents(showAuth)
            }
        }, [activeView])
        
        return(
            <>
                {components}
            </>
        )
}

export default MainContent