import React, { useState } from 'react'
import TopNav from "./components/navigation/TopNav";
import LeftNav from './components/navigation/LeftNav';
import './ApplicationView.css'
import MainContent from './MainContentView';
import { WidgetProvider } from './components/data/WidgetProvider';
import { DateProvider } from './components/data/DateCalculator';
import { DataProvider } from './components/data/DataProvider';

const ApplicationView = (props) => {
    const [showLeftNav, setShowLeftNav] = useState(false)
    const [activeView, setActiveView] = useState('dashboard')
    const [modify, setModify] = useState(false)
    
    const toggleNav = () => {
        if (sessionStorage.getItem("user")) {
            setShowLeftNav(!showLeftNav)
        }
    }

    const toggleModify = () => {
        setModify(!modify)
    }

    console.log(modify)

        return (
            <>
            <DataProvider>
            <DateProvider>
            <WidgetProvider>
                <TopNav toggleNav={toggleNav} toggleModify={toggleModify} activeView={activeView}/>

                <div className="main">
                    {showLeftNav ? <LeftNav setActiveView={setActiveView} toggleNav={toggleNav} /> : <div></div>}
                                <MainContent activeView={activeView} leftNav={showLeftNav}
                                    setActiveView={setActiveView} modify={modify}
                                    props={props}/>
                </div>
            </WidgetProvider>
            </DateProvider>
            </DataProvider>
            </>
        )
}

export default ApplicationView