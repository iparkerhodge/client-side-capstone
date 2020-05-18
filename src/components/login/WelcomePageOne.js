import React, { useEffect } from 'react'
import LoginMap from '../map/LoginMap'
import { ReactComponent as Arrow } from '../../images/arrow.svg'
import { motion, useAnimation } from 'framer-motion'

export const WelcomePageOne = ({ togglePage }) => {
    const controls = useAnimation()

    useEffect(() => {
        controls.start({
            scale: [1, 1.15, 1],
            transition: { duration: 1.8, loop: Infinity }
        })
    })

    return (
        <div>
            <LoginMap />
            <div className="arrowIcon">
                <div className='arrowText'>proceed to login</div>
                <motion.div animate={controls}
                    onMouseOver={() => controls.stop()}
                    onMouseLeave={() => {
                        controls.start({
                            scale: [1, 1.15, 1],
                            transition: { duration: 1.8, loop: Infinity }
                        })
                    }}>
                    <Arrow className='arrow' onClick={togglePage} />
                </motion.div>
            </div>
        </div>
    )
}