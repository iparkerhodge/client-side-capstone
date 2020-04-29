import React, { useState } from 'react'
import TopNav from "./components/navigation/TopNav";
import LeftNav from './components/navigation/LeftNav';
import './ApplicationView.css'
import MainContent from './MainContentView';

const ApplicationView = () => {
    const [showLeftNav, setShowLeftNav] = useState(false)
    const toggleNav = () => {
        if (sessionStorage.getItem("user")) {
            setShowLeftNav(!showLeftNav)
        }
    }

    const [activeView, setActiveView] = useState('dashboard')
    
    if (showLeftNav) {
        return (
            <>
                <TopNav toggleNav={toggleNav}/>

                <div className="main">
                    <LeftNav setActiveView={setActiveView}/>
                    <MainContent activeView={activeView} />
                </div>
            </>
        )
    }
    else {
        return (
            <>
                <TopNav toggleNav={toggleNav}/>

                <div className="main">
                    <MainContent activeView={activeView} />
                </div>
            </>
        )
    }
}

export default ApplicationView