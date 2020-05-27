import React, { useState, useEffect } from 'react'

export const WidgetsContext = React.createContext()

export const WidgetProvider = (props) => {
    const [widgets, setWidgets] = useState([])

    const [showDelete, setShowDelete] = useState(false)

    const toggleShowDelete = () => {
        setShowDelete(!showDelete)
    }

    const getWidgets = () => {
        return fetch('https://custom-covid19-tracker-api.herokuapp.com/widgets')
            .then(r => r.json())
            .then(setWidgets)
    }

    const addWidget = widget => {
        return fetch('https://custom-covid19-tracker-api.herokuapp.com/widgets', {
            method:'POST',
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify(widget)
        })
            .then(getWidgets)
    }

    const removeWidget = widgetId => {
        return fetch(`https://custom-covid19-tracker-api.herokuapp.com/widgets/${widgetId}`, {
            method: "DELETE"
        })
            .then(getWidgets)
    }

    useEffect(() => {
        getWidgets()
    }, [])

    return (
        <WidgetsContext.Provider value={{
            widgets, addWidget, removeWidget, showDelete, toggleShowDelete
        }}>
            {props.children}
        </WidgetsContext.Provider>
    )
}