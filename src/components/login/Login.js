import React, {useRef} from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

export const Login = (props) => {
    const email = useRef()
    const password = useRef()

    const existingUserCheck = () => {
        return fetch(`https://custom-covid19-tracker-api.herokuapp.com/users?email=${email.current.value}`)
        .then(_ => _.json())
        .then(user => {
            if (user.length) {
                return user[0]
            }
            return false
        })
    }

    const handleLogin = (e) => {
        e.preventDefault()

        existingUserCheck()
            .then(exists => {
                if (exists && exists.password === password.current.value) {
                    sessionStorage.setItem("user", exists.id)
                    props.toggleLogin()
                }
                else if (exists && exists.password !== password.current.value) {
                    window.alert("Password does not match")
                }
                else if (!exists) {
                    window.alert("User account does not exist")
                }
            })
    }

    return (
        <div className="loginFormContainer">
            <form onSubmit={handleLogin}>
                <div>Please sign in</div>
                <fieldset>
                    <TextField inputRef={email} type="email"
                        id="email"
                        className="form-control"
                        placeholder="Email address"
                        required autoFocus />
                </fieldset>
                <fieldset>
                    <TextField inputRef={password} type="password"
                        id="password"
                        className="form-control"
                        placeholder="Password"
                        required />
                </fieldset>
                <fieldset>
                    <Button type="submit">
                        Sign in
                    </Button>
                </fieldset>
            </form>
        </div>
    )
}