import React, { useContext} from 'react'
import './Navigation.css'
import {ReactComponent as MenuButton} from '../../images/Menu Button.svg'
import { WidgetsContext } from '../data/WidgetProvider'

const TopNav = ({toggleNav, activeView}) => {
    const {toggleShowDelete} = useContext(WidgetsContext)


    return(
    <header className="topNav">
        <div className="menuButtonContainer"><MenuButton className="menuButton" onClick={toggleNav}/></div>
        <div>Welcome to Custom Covid Tracker</div>
        {activeView === 'dashboard' ? <div className='modify' onClick={toggleShowDelete}>Modify Dashboard</div> : <div></div>}
    </header>
    )
}

export default TopNav