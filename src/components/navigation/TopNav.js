import React, { useContext } from 'react'
import './Navigation.css'
import { ReactComponent as MenuButton } from '../../images/Menu Button.svg'
import { WidgetsContext } from '../data/WidgetProvider'

const TopNav = ({ toggleNav, activeView }) => {
    const { toggleShowDelete } = useContext(WidgetsContext)


    return (
        <header className="topNav">
            <div className='box'>
                <div className="menuButtonContainer"><MenuButton className="menuButton" onClick={toggleNav} /></div>
            </div>
            <div className='pageName'>{activeView.toUpperCase()}</div>
            {activeView === 'dashboard' ? <div className='modify' onClick={toggleShowDelete}>Modify Dashboard</div> : <div className='modify'></div>}
        </header>
    )
}

export default TopNav