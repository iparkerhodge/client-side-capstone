import React, { useState, useEffect } from 'react'
import GlobalMap from './GlobalMap'
import USAMap from './USMap'
import { Menu } from 'antd'
import 'antd/dist/antd.css'
import './map.css'

export const MapList = () => {
    const [map, setMap] = useState(0)
    const [components, setComponents] = useState()

    const showWorld = (<GlobalMap />)
    const showUS = (<USAMap />)

    useEffect(() => {
        if(map === 0) {
            setComponents(showWorld)
        }
        else if (map === 1) {
            setComponents(showUS)
        }
    }, [map])

    return (
        <div className='mapContainer'>
            <Menu mode='horizontal' className='mapMenu'>
                <Menu.Item key={0} onClick={() => setMap(0)}>World Map</Menu.Item>
                <Menu.Item key={1} onClick={() => setMap(1)}>US Map</Menu.Item>
            </Menu>
            <div className='map'>
            {components}
            </div>
        </div>
    )
}