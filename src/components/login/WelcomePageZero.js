import React from 'react'
import { useSpring, animated } from 'react-spring'

export const WelcomePageZero = () => {
    const appear = useSpring({ opacity: 1, from: { opacity: 0 }, delay: 2000 })

    return (
            <div className='welcomeLoad'>
                <animated.div className='welcomeLoadMessage' 
                    style={appear}>view the demo or proceed to login.</animated.div>
            </div>
    )
}