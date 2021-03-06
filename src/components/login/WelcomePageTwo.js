import React from 'react'
import { Register } from './Register'
import { Login } from './Login'
import { LoginChart } from './LoginChart'

export const WelcomePageTwo = ({ toggleLogin }) => (
    <>
        <div className="info">
            <LoginChart />
            <div>As policy makers begin to re-open states and municipalities with questionable regard for scientific data,
            Custom COVID-19 Tracker was designed for you to track the data in your region to make the right
            decisions for you.
                </div>
            <div>
                Using data uploaded and maintained by the Johns Hopkins University Center for Systems Science and Engineering,
                gathered from the World Health Organization, US CDC, China CDC, National Health Comission of the People's Republic of China,
                Government of Canada, Australia Government Department of Health, and more, Custom COVID-19 Tracker aims to provide
                you with the most detailed analysis of the novel coronavirus (SARS-CoV-2/COVID-19).
                </div>
            <div>
                Register or login to begin creating your customizable dashboard to track confirmed cases, percent change, new cases,
                and moving averages for the countries, provinces, states, and counties that matter to you.
                </div>
        </div>
        <div className="authContainer">
            <Login toggleLogin={toggleLogin} />
            <Register toggleLogin={toggleLogin} />
        </div>
    </>
)