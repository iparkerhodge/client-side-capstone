import React from 'react'
import { Register } from './Register'
import { Login } from './Login'

export const Auth = ({toggleLogin}) => (
    <>
        <h1>Welcome</h1>
        <div className="AuthContainer">
            <Login toggleLogin={toggleLogin} />
            <Register toggleLogin={toggleLogin} />
        </div>
    </>
)