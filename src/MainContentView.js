import React, { useState } from 'react'
import { Auth } from './components/login/Auth'
import Dashboard from './components/dashboard/Dashboard'

const MainContent = () => {
    const [check, update] = useState(false)
    const toggleLogin = () => update(!check)


    return (
        sessionStorage.getItem("user") ? <Dashboard /> : <Auth toggleLogin={toggleLogin} />
    )
}

export default MainContent