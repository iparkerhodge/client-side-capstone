import React, { useState, useEffect } from 'react'

export const WidgetsContext = React.createContext()

export const WidgetProvider = (props) => {
    const [widgets, setWidgets] = useState([])

    const getWidgets = () => {
        return fetch('http://localhost:8088/widgets')
            .then(r => r.json())
            .then(setWidgets)
    }

    const addWidget = widget => {
        return fetch('http://localhost:8088/widgets', {
            method:'POST',
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify(widget)
        })
            .then(getWidgets)
    }

    useEffect(() => {
        getWidgets()
    }, [])

    return (
        <WidgetsContext.Provider value={{
            widgets, addWidget
        }}>
            {props.children}
        </WidgetsContext.Provider>
    )
}