import React, { useContext } from 'react'
import { WidgetsContext } from '../data/WidgetProvider'
import { TotalCasesDash } from '../charts/TotalCasesDash'
import { PercentChangeDash } from '../charts/PercentChangeDash'
import { MovingAverageDash } from '../charts/MovingAverageDash'
import './Dashboard.css'

const Dashboard = () => {
    const {widgets, removeWidget} = useContext(WidgetsContext)
    const currentUser = +(sessionStorage.getItem("user"))
    const usersWidgets = widgets.filter (o => o.userId === currentUser)

    const {showDelete} = useContext(WidgetsContext)

    return(
        <>
        <div className='dashboardHeader'>Dashboard</div>
        <div className='dashboard'>
            {usersWidgets.map((widget) => {
            if(widget.statistic === 'totalCases') {
                //make a graph with the props country, state, county
                return (
                    <div className="widgetContainer">
                        {showDelete ? <div className="btn btn--delete" onClick={() => {removeWidget(widget.id)}}>x</div> : ''}
                        <TotalCasesDash key={widget.id} country={widget.country} state={widget.state} county={widget.county}/>
                    </div>
                )
            }
            else if(widget.statistic === 'percentChange') {
                return (
                    <div className="widgetContainer">
                        {showDelete ? <div className="btn btn--delete" onClick={() => {removeWidget(widget.id)}}>x</div> : ''}
                        <PercentChangeDash key={widget.id} country={widget.country} state={widget.state} county={widget.county} />
                    </div>
                )
            }
            else if(widget.statistic === 'movingAverage') {
                return (
                    <div className="widgetContainer">
                        {showDelete ? <div className="btn btn--delete" onClick={() => {removeWidget(widget.id)}}>x</div> : ''}
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