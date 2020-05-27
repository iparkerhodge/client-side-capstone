import React, {useRef} from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'


export const Register = (props) => {
    const name = useRef()
    const email = useRef()
    const password = useRef()
    const verifyPassword = useRef()


    const existingUserCheck = () => {
        return fetch(`https://custom-covid19-tracker-api.herokuapp.com/users?email=${email.current.value}`)
        .then(_ => _.json())
        .then(user => {
            if (user.length) {
                return false
            }
            return true
        })
    }

    const handleRegister = (e) => {
        e.preventDefault()

        if (password.current.value === verifyPassword.current.value) {
            existingUserCheck()
            .then((result) => {
                if (result) {
                fetch('https://custom-covid19-tracker-api.herokuapp.com/users', {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        email: email.current.value,
                        password: password.current.value,
                        name: name.current.value
                    })
                })
                    .then(_ => _.json())
                    .then(createdUser => {
                        if (createdUser.hasOwnProperty("id")) {
                            sessionStorage.setItem("user", createdUser.id)
                            props.toggleLogin()
                        }
                    })
                }
                else {
                    window.alert("user already exists")
                }
            })
        }
        else {
            window.alert("Passwords do not match")
        }
    }

    return (
        <div className="registerFormContainer">
            <form onSubmit={handleRegister}>
                <div className="darkgray">If you do not have a custom dashboard yet, please register a new account</div>
                <fieldset>
                    <TextField inputRef={name} type="text"
                        name="name"
                        className="form-control"
                        placeholder="Name"
                        required  />
                </fieldset>
                <fieldset>
                    <TextField inputRef={email} type="email"
                        name="email"
                        className="form-control"
                        placeholder="Email address"
                        required />
                </fieldset>
                <fieldset>
                    <TextField inputRef={password} type="password"
                        name="password"
                        className="form-control"
                        placeholder="Password"
                        required />
                </fieldset>
                <fieldset>
                    <TextField inputRef={verifyPassword} type="password"
                        name="verifyPassword"
                        className="form-control"
                        placeholder="Verify password"
                        required />
                </fieldset>
                <fieldset>
                    <Button type="submit">
                        Register
                    </Button>
                </fieldset>
            </form>
        </div>
    )
}