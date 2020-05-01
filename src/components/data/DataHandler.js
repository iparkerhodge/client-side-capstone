import React, { useContext } from 'react'
import { DataContext } from './DataProvider'
import { format,subDays } from 'date-fns'


const { timeSeriesGlobal } = useContext(DataContext)

//make an array of all dates
let allDates = []

const distanceFromDay0 = formatDistanceStrict(
    subDays(new Date(), 1),
    new Date(2020, 0, 22),
    { unit: 'day' }
)

const [distanceNumberString, _] = distanceFromDay0.split(' ')
const distanceNumber = parseInt(distanceNumberString)

const pushDatesToArray = () => {
    let i
    for (i = 0; i < (distanceNumber - 1); i++) {

        const day = format(addDays(new Date(2020, 0, 22), i), "M/d/yy")

        allDates.push(day)
    }
}

pushDatesToArray()

//mutate data to represent {country/region}
let chinaProvinces = []
const condenseChina = () => {
    chinaProvinces = timeSeriesGlobal.filter(prov => {
        return prov["Country/Region"] === "China"
    })
}

const appendChinaProvinces = () => {
    for (const object of chinaProvinces) {
        for (const prop in object) {
            if ()
        }
    }
}

//write a function that takes input date and outputs the {country: USA, total: 9000}
const giveTotalByCountryForDate = (date) => {

}