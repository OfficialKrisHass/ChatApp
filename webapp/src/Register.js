import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./Register.css"

let status = 0;

function Register() {

    const [data, setData] = useState({});
    const [error, setError] = useState({});

    const navigate = useNavigate();

    const onChange = (event) => {

        setData({

            ...data,
            [event.target.name]: event.target.value

        });

    }
    const register = () => {

        setError(validateData(data));
        if (status !== 1) return;

        fetch("/api/auth", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: data.name,
                email: data.email,
                password: data.password,
            })
        }).then(res => res.json())
        .then(res => {

            if (res.status !== 1) {

                setError({ type: 4, msg: res.msg });
                return;

            }

            localStorage.setItem("user", JSON.stringify({
                token: res.token,
                name: data.name,
                email: data.email
            }));

            navigate("/");

        })

    }

    return (
        <div className="container register">
            <h1>Register</h1>

            <div className="inputField">
                <input type="text" name="name" placeholder="Username" onChange={onChange}/>
                <label className="errLabel">{ error.type === 1 ? error.msg : "" }</label>
            </div>
            <div className="inputField">
                <input type="email" name="email" placeholder="Email" onChange={onChange}/>
                <label className="errLabel">{ error.type === 2 ? error.msg : "" }</label>
            </div>
            <div className="inputField">
                <input type="password" name="password" placeholder="Password" onChange={onChange}/>
                <label className="errLabel">{ error.type === 3 ? error.msg : "" }</label>
            </div>
            <label className="errLabel">{ error.type === 4 ? error.msg : "" }</label>
            <button onClick={register}>Register</button>
        </div>
    )

}

function validateData(data) {

    if (data.name === undefined || data.name === "")
        return { type: 1, msg: "Username can't be empty" };
    if (data.name.length > 63)
        return { type: 1, msg: "Username can't be longer than 64 characters" };

    if (data.email === undefined || data.email === "")
        return { type: 2, msg: "Email can't be empty" };
    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(data.email))
        return { type: 2, msg: "Please enter a valid email" };

    if (data.password === undefined || data.password === "")
        return { type: 3, msg: "Please enter a valid password" };
    if (data.password.length < 6)
        return { type: 3, msg: "Password must be at least 6 characters" };

    status = 1;

    return {};

}

export default Register;
