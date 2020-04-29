import React, { useState } from 'react'
import TopNav from "./components/navigation/TopNav";
import LeftNav from './components/navigation/LeftNav';
import './ApplicationView.css'
import MainContent from './MainContentView';

const ApplicationView = () => {
    const [showLeftNav, setShowLeftNav] = useState(false)
    const toggleNav = () => {setShowLeftNav(!showLeftNav)}

    if (showLeftNav) {
        return (
            <>
                <TopNav toggleNav={toggleNav}/>

                <div className="main">
                    <LeftNav />
                     <MainContent />
                </div>
            </>
        )
    }

    else {
        return (
            <>
                <TopNav toggleNav={toggleNav}/>

                <div className="main">
                    <MainContent />
                </div>
            </>
        )
    }
}

export default ApplicationView