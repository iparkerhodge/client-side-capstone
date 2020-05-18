import React, { useState, useEffect } from 'react'
import './Auth.css'
import { WelcomePageOne } from './WelcomePageOne'
import { WelcomePageTwo } from './WelcomePageTwo'
import { useSpring, animated } from 'react-spring'
import { WelcomePageZero } from './WelcomePageZero'

export const Auth = ({ toggleLogin }) => {
    const [page, setPage] = useState(0)
    const togglePage = () => setPage(2)
    const [components, setComponents] = useState()

    useEffect(() => {
        setTimeout(() => {
            setPage(1)
        }, 3500)
    }, [])

    const showPageZero = () => {
        return <WelcomePageZero />
    }

    const showPageOne = () => {
        return <WelcomePageOne togglePage={togglePage} />
    }

    const showPageTwo = () => {
        return <WelcomePageTwo toggleLogin={toggleLogin} />
    }

    useEffect(() => {
        if (page === 1) {
            setComponents(showPageOne)
        }
        else if (page === 2) {
            setComponents(showPageTwo)
        }
        else if (page === 0) {
            setComponents(showPageZero)
        }
    }, [page])

    const animation = useSpring({ opacity: 1, from: { opacity: 0 } , delay: 1000})

    return (
        <div className='auth'>
            <animated.div className='welcomeMessageContainer' style={animation} >
                <h1 className="welcomeMessage">Welcome to Custom COVID-19 Tracker</h1>
            </animated.div>
            {components}
        </div>
    )
}