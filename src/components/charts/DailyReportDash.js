import React, { useContext, useState, useEffect } from 'react'
import { DateContext } from '../data/DateCalculator'
import { DataContext } from '../data/DataProvider'
import { format } from 'date-fns'
import { Table } from 'antd'

const formatDate = (date) => {
    return format(new Date(date), 'MM-dd-yyyy')
}

const DailyReportDash = ({setActiveView}) => {
    const { allDateArray } = useContext(DateContext)
    const { getDailyReport, dailyReport } = useContext(DataContext)
    const [dateSelected, setDateSelected] = useState(formatDate(allDateArray.slice(-1)[0]))
    const [options, setOptions] = useState()

    let datesReversed = allDateArray

    useEffect(() => {
        datesReversed = allDateArray.slice().reverse()
        setOptions(datesReversed.map((date, i) => {
            return <option key={i} value={date}>{date}</option>
        }))
        getDailyReport(dateSelected)
    }, [])

    const changeDate = (event) => {
        const newDate = formatDate(event.target.value)
        if (newDate !== "0") {
            setDateSelected(newDate)
        }
    }

    useEffect(() => {
        getDailyReport(dateSelected)
    }, [dateSelected])

    return (
        <div>
            <select onChange={changeDate}>
                {options}
            </select>
            <Table columns={columns} dataSource={dailyReport} />
        </div>
    )
}

export default DailyReportDash

const columns = [
    {
        title: 'State',
        dataIndex: 'Province_State',
        key: 'state',
        sorter: (a,b) => {
            if(a['Province_State'] < b['Province_State']) {
                return -1
            }
            else if (a['Province_State'] > b['Province_State']) {
                return 1
            }
        }
    },
    {
        title: 'Confirmed',
        dataIndex: 'Confirmed',
        key: 'confirmed',
        sorter: (a,b) => {
            if(+(a['Confirmed']) < +(b['Confirmed'])) {
                return -1
            }
            else if(+(a['Confirmed']) > +(b['Confirmed'])) {
                return 1
            }
        },
        defaultSortOrder: 'descend'
    },
    {
        title: 'Active',
        dataIndex: 'Active',
        key: 'active',
        sorter: (a,b) => {
            if(+(a['Active']) < +(b['Active'])) {
                return -1
            }
            else if(+(a['Active']) > +(b['Active'])) {
                return 1
            }
        }
    },
    {
        title: 'Deaths',
        dataIndex: 'Deaths',
        key: 'deaths',
        sorter: (a,b) => {
            if(+(a['Deaths']) < +(b['Deaths'])) {
                return -1
            }
            else if(+(a['Deaths']) > +(b['Deaths'])) {
                return 1
            }
        }
    },
    {
        title: 'Motality Rate',
        dataIndex: 'Mortality_Rate',
        key: 'mortality',
        sorter: (a,b) => {
            if(a['Mortality_Rate'] < b['Mortality_Rate']) {
                return -1
            }
            else if (a['Mortality_Rate'] > b['Mortality_Rate']) {
                return 1
            }
        },
        render: text => Math.round(+(text) *100)/100
    },
    {
        title: 'Incidence Rate',
        dataIndex: 'Incident_Rate',
        key: 'incidence',
        sorter: (a,b) => {
            if(+(a['Incident_Rate']) < +(b['Incident_Rate'])) {
                return -1
            }
            else if(+(a['Incident_Rate']) > +(b['Incident_Rate'])) {
                return 1
            }
        },
        render: text => Math.round(+(text) *100)/100
    },
    {
        title: 'People Hospitalized',
        dataIndex: 'People_Hospitalized',
        key: 'hospitalized',
        sorter: (a,b) => {
            if(+(a['People_Hospitalized']) < +(b['People_Hospitalized'])) {
                return -1
            }
            else if(+(a['People_Hospitalized']) > +(b['People_Hospitalized'])) {
                return 1
            }
        }
    },
    {
        title: 'Hospitalization Rate',
        dataIndex: 'Hospitalization_Rate',
        key: 'hospitalRate',
        sorter: (a,b) => {
            if(+(a['Hospitalization_Rate']) < +(b['Hospitalization_Rate'])) {
                return -1
            }
            else if(+(a['Hospitalization_Rate']) > +(b['Hospitalization_Rate'])) {
                return 1
            }
        },
        render: text => Math.round(+(text) *100)/100
    },
    {
        title: 'People Tested',
        dataIndex: 'People_Tested',
        key: 'tested',
        sorter: (a,b) => {
            if(+(a['People_Tested']) < +(b['People_Tested'])) {
                return -1
            }
            else if(+(a['People_Tested']) > +(b['People_Tested'])) {
                return 1
            }
        }
    },
    {
        title: 'Testing Rate',
        dataIndex: 'Testing_Rate',
        key: 'testingRate',
        sorter: (a,b) => {
            if(+(a['Testing_Rate']) < +(b['Testing_Rate'])) {
                return -1
            }
            else if(+(a['Testing_Rate']) > +(b['Testing_Rate'])) {
                return 1
            }
        },
        render: text => Math.round(+(text) *100)/100
    }
]