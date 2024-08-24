import { useState } from "react";

import "./Register.css"

function Register() {

    const [data, setData] = useState({});
    const [errors, setErrors] = useState({});

    const onChange = (event) => {

        setData({

            ...data,
            [event.target.name]: event.target.value

        });

    }
    const register = () => {

        setErrors(validateData(data));
        if (errors !== null) return;

    }

    return (
        <div className="container register">
            <h1>Register</h1>

            <div className="inputField">
                <input type="text" name="name" placeholder="Username" onChange={onChange}/>
                <label>{ errors ? errors.nameError : "" }</label>
            </div>
            <div className="inputField">
                <input type="email" name="email" placeholder="Email" onChange={onChange}/>
                <label>{ errors ? errors.emailError : "" }</label>
            </div>
            <div className="inputField">
                <input type="password" name="password" placeholder="Password" onChange={onChange}/>
                <label>{ errors ? errors.passwordError : "" }</label>
            </div>
            <button onClick={register}>Register</button>
        </div>
    )

}

function validateData(data) {

    if (data.name === undefined || data.name === "")
        return { nameError: "Username can't be empty" };
    if (data.name.length > 63)
        return { nameError: "Username can't be longer than 64 characters" };

    if (data.email === undefined || data.email === "")
        return { emailError: "Email can't be empty" };
    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(data.email))
        return { emailError: "Please enter a valid email" };

    if (data.password === undefined || data.password === "")
        return { passwordError: "Please enter a valid password" };
    if (data.password.length < 6)
        return { passwordError: "Password must be at least 6 characters" };

    return null;

}

export default Register;
