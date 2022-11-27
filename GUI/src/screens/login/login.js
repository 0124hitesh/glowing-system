import React, { useEffect, useRef } from 'react'
import axios from 'axios'
import './login.css'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from 'react-bootstrap';
import IsLogIn from '../../actions/checkLogin';

export default function Login(props) {
    const navigate = useNavigate();
    useEffect(() => {
        if(IsLogIn()) navigate('/data')
        // console.log('IsLogIn: ', IsLogIn());
    }, [])
    

    const mail = useRef();
    const password = useRef();

    async function login() {
        var fdata = new FormData();
        if(mail === "" || password === ""){
            alert("Credentials aren't valid");
            return
        }
        fdata.append("mail", mail.current.value);
        fdata.append("password", password.current.value);
        

        await axios.post('/api/users/login', fdata, {
            headers: {
                "Content-Type": "multipart/form-data",
              }
        }).then((res) => {
            if (res.status === 201) {
                console.log(res.data)
                localStorage.setItem('userInfo', JSON.stringify(res.data))
                props.p1(true)
                navigate('/data')
            }
        }).catch((err) => {
            alert(err.response.data)
        })
    }

    const hanEvent = e => {
        if(e.keyCode === 13) login()
    } 

    return (
        <>
            <section className="a" onKeyDown={hanEvent}>
                <section className="aa">
                    <h2>Log in</h2>
                </section>
                <br /><br />
                <article className="ph">
                    <input type="text" placeholder=" " id="yname" ref={mail} />
                    <span className="sp">Your email/username</span>
                </article>
                <br />
                <article className="ph">
                    <input type="password" placeholder=" " ref={password} />
                    <span className="sp">Your password</span>
                </article>
                <a href="/" id="fp">Forgot <b>Password?</b></a>
                <br /><br /><br />
                <Button id="login" onClick={login} >LOG IN</Button>
                <p>Don't have an account?<Link to="/signup"> <b>Sign Up</b></Link></p>
            </section>
        </>
    )
}