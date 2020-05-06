import React, { useState } from 'react'
import TopNav from "./components/navigation/TopNav";
import LeftNav from './components/navigation/LeftNav';
import './ApplicationView.css'
import MainContent from './MainContentView';
import { WidgetProvider } from './components/data/WidgetProvider';

const ApplicationView = () => {
    const [showLeftNav, setShowLeftNav] = useState(false)
    const [activeView, setActiveView] = useState('dashboard')
    
    const toggleNav = () => {
        if (sessionStorage.getItem("user")) {
            setShowLeftNav(!showLeftNav)
        }
    }

    
    if (showLeftNav) {
        return (
            <>
                <TopNav toggleNav={toggleNav}/>

                <div className="main">
                    <LeftNav setActiveView={setActiveView} toggleNav={toggleNav} />
                    <WidgetProvider>
                        <MainContent activeView={activeView} leftNav={showLeftNav} setActiveView={setActiveView}/>
                    </WidgetProvider>
                </div>
            </>
        )
    }
    else {
        return (
            <>
                <TopNav toggleNav={toggleNav}/>

                <div className="main">
                    <WidgetProvider>
                        <MainContent activeView={activeView} setActiveView={setActiveView}/>
                    </WidgetProvider>
                </div>
            </>
        )
    }
}

export default ApplicationView