import React from 'react'
import './Navigation.css'
import {ReactComponent as MenuButton} from '../../images/Menu Button.svg'

const TopNav = ({toggleNav}) => (
    <header className="topNav">
        <div className="menuButtonContainer"><MenuButton className="menuButton" onClick={toggleNav}/></div>
        Welcome to Custom Covid Tracker
    </header>
)

export default TopNav