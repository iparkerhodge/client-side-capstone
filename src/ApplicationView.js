import React, { useState } from 'react'
import TopNav from "./components/navigation/TopNav";
import LeftNav from './components/navigation/LeftNav';
import './ApplicationView.css'

const ApplicationView = () => {
    const [showLeftNav, setShowLeftNav] = useState(false)
    const toggle = () => {setShowLeftNav(!showLeftNav)}

    if (showLeftNav) {
        return (
            <>
                <TopNav toggle={toggle}/>

                <div className="main">
                    <LeftNav />
                    <div className="test">Login</div>
                </div>
            </>
        )
    }

    else {
        return (
            <>
                <TopNav toggle={toggle}/>

                <div className="main">
                    <div className="test">Login</div>
                </div>
            </>
        )
    }
}

export default ApplicationView