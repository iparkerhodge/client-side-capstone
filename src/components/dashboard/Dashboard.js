import React, { useContext, useEffect, useState } from 'react'
import { WidgetsContext } from '../data/WidgetProvider'
import { TotalCasesDash } from '../charts/TotalCasesDash'
import { PercentChangeDash } from '../charts/PercentChangeDash'
import { MovingAverageDash } from '../charts/MovingAverageDash'

const Dashboard = ({modify}) => {
    const {widgets} = useContext(WidgetsContext)
    const currentUser = +(sessionStorage.getItem("user"))
    const usersWidgets = widgets.filter (o => o.userId === currentUser)

    const {deleteMe} = useContext(WidgetsContext)
    useEffect(() => {
        console.log(deleteMe)
    }, [deleteMe])

    return(
        <>
        <div></div>
        <div>
            {usersWidgets.map((widget) => {
            if(widget.statistic === 'totalCases') {
                //make a graph with the props country, state, county
                return (
                    <div>
                        {deleteMe ? <div>Delete Me</div> : ''}
                        <TotalCasesDash key={widget.id} country={widget.country} state={widget.state} county={widget.county}/>
                    </div>
                )
            }
            else if(widget.statistic === 'percentChange') {
                return (
                    <div>
                        {modify ? <div>delete</div> : ''}
                        <PercentChangeDash key={widget.id} country={widget.country} state={widget.state} county={widget.county} />
                    </div>
                )
            }
            else if(widget.statistic === 'movingAverage') {
                return (
                    <div>
                        {modify ? <div>delete</div> : ''}
                        <MovingAverageDash key={widget.id} country={widget.country} state={widget.state} county={widget.county} />
                    </div>
                )
            }
        })}
        </div>
        </>
    )
}

export default Dashboard