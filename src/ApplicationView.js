import React, { useState, useEffect } from 'react'
import TopNav from "./components/navigation/TopNav";
import LeftNav from './components/navigation/LeftNav';
import './ApplicationView.css'
import MainContent from './MainContentView';
import { WidgetProvider } from './components/data/WidgetProvider';
import { DateProvider } from './components/data/DateCalculator';
import { DataProvider } from './components/data/DataProvider';
import { CreateJSON } from './components/map/JSONConverter';

const ApplicationView = () => {
    const [showLeftNav, setShowLeftNav] = useState(false)
    const [activeView, setActiveView] = useState('login')

    useEffect(() => {
        if(sessionStorage.getItem('user')) {
            setActiveView('dashboard')
        }
    }, [])
    
    const toggleNav = () => {
        if (sessionStorage.getItem("user")) {
            setShowLeftNav(!showLeftNav)
        }
    }

    return (
        <>
        <DataProvider>
        <DateProvider>
        <WidgetProvider>
        <CreateJSON>
            {activeView !== 'login' ? <TopNav toggleNav={toggleNav} activeView={activeView} /> : ''}

            <div className="main">
                {showLeftNav ? <LeftNav setActiveView={setActiveView} toggleNav={toggleNav} /> : <div></div>}
                <MainContent activeView={activeView} leftNav={showLeftNav}
                    setActiveView={setActiveView}/>
            </div>
        </CreateJSON>
        </WidgetProvider>
        </DateProvider>
        </DataProvider>
         </>
        )
}

export default ApplicationView