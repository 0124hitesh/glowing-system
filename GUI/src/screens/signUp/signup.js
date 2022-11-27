import React, { useRef, useState } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom'

import '../../../node_modules/bootstrap/dist/css/bootstrap.css'
import './signup.css'
import {Button} from 'react-bootstrap';
import z from '../../assets/z.png'

function Signup(props) {
    const name = useRef();
    const mail = useRef();
    const password = useRef();
   

    var [imgSrc, setSrc] = useState(z);
    var [img, setImg] = useState();

    async function setI(e){
        const im = e.target.files[0];
        setImg(im)
        setSrc(URL.createObjectURL(e.target.files[0]));
    }

    async function addUser(){
        var fdata = new FormData();
        fdata.append("pic", img);
        fdata.append("name", name.current.value);
        fdata.append("mail", mail.current.value);
        fdata.append("password", password.current.value);
    
        await axios.post('/api/users/signup', fdata).then((res) => {
            alert(res.data)
        }).catch((err) => {
            alert(err);
        })
    }

    const hanEvent = e => {
        if(e.keyCode === 13) addUser()
    } 

    return (
        <>
            <section className='b' onKeyDown={hanEvent}>
                <h2>Sign up</h2> 
                <br />
                <input type="file" accept="image/png, image/gif, image/jpeg, image/jpg" id="selectImg" className="" onChange={setI} />
                <img src={imgSrc} alt="imag" id="profile_img" />
                
                <article className="ph">
                    <input type="text" placeholder=" " id="name" ref={name}/>
                    <span className="sp">Your Name</span>
                </article>
                <br />
                <article className="ph">
                    <input type="email" placeholder=" " id="email" ref={mail}/>
                    <span className="sp">Your email/username</span>
                </article>
                <br />
                <article className="ph">
                    <input type="password" placeholder=" " ref={password}/>
                    <span className="sp">Your password</span>
                </article>
                <br />
               
                <Button id="signup" onClick={addUser} >Sign up</Button>
                <p>Have an account? <Link to="/login">Log in</Link></p>
                <br/>
                
            </section>
        </>
    )
}

export { Signup }