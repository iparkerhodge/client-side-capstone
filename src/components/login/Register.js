import React, {useRef} from 'react'

export const Register = (props) => {
    const name = useRef()
    const email = useRef()
    const password = useRef()
    const verifyPassword = useRef()

    const existingUserCheck = () => {
        return fetch(`http://localhost:8088/users?email=${email.current.value}`)
        .then(_ => _.json())
        .then(user => {
            if (user.length) {
                return true
            }
            return false
        })
    }

    const handleRegister = (e) => {
        e.preventDefault()

        if (password.current.value === verifyPassword.current.value) {
            existingUserCheck()
            .then(() => {
                fetch('http://localhost:8088/users', {
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
            })
        }
        else {
            window.alert("Passwords do not match")
        }
    }

    return (
        <div className="container--login">
            <form className="form--register" onSubmit={handleRegister}>
                <h4 className="darkgray">If you are not a customer yet, please register a new account</h4>
                <fieldset>
                    <label htmlFor="name"> Name </label>
                    <input ref={name} type="text"
                        name="name"
                        className="form-control"
                        placeholder="Name"
                        required  />
                </fieldset>
                <fieldset>
                    <label htmlFor="inputEmail"> Email address </label>
                    <input ref={email} type="email"
                        name="email"
                        className="form-control"
                        placeholder="Email address"
                        required />
                </fieldset>
                <fieldset>
                    <label htmlFor="inputPassword"> Password </label>
                    <input ref={password} type="password"
                        name="password"
                        className="form-control"
                        placeholder="Password"
                        required />
                </fieldset>
                <fieldset>
                    <label htmlFor="verifyPassword"> Verify Password </label>
                    <input ref={verifyPassword} type="password"
                        name="verifyPassword"
                        className="form-control"
                        placeholder="Verify password"
                        required />
                </fieldset>
                <fieldset>
                    <button type="submit">
                        Register
                    </button>
                </fieldset>
            </form>
        </div>
    )
}