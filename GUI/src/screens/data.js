import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import IsLogIn from "../actions/checkLogin";

import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { Button } from "react-bootstrap";
import SongData from '../Songs/main'

export default function Data(props) {
    const navigate = useNavigate();

    function arrayBufferToBase64(buffer) {
        var binary = '';
        var bytes = [].slice.call(new Uint8Array(buffer));
        bytes.forEach((b) => binary += String.fromCharCode(b));
        return window.btoa(binary);
    }

    useEffect(() => {

        if (!IsLogIn()) {
            navigate('/login')
            // console.log("check")
        }
        else {
            const userInfo = JSON.parse(localStorage.getItem('userInfo'));
            const z = arrayBufferToBase64(userInfo.pic.data.data)
            const imgSrc = "data:image/jpg;base64," + z;
            setSrc(imgSrc)
            setName(userInfo.name)
        }
        console.log('IsLogIn: ', IsLogIn());
    }, [navigate])

    function logOut() {
        localStorage.removeItem('userInfo')
        props.p1(false)
        navigate('/')
    }

    var [imgSrc, setSrc] = useState();
    var [name, setName] = useState();

    return (
        <>
            <Navbar bg="light" expand="lg">
                <Container className="justify-content-between">
                    <section>
                        <img src={imgSrc} alt="imag" id="profile_img_loggedIn" />
                        {name}
                    </section>

                    <Button onClick={logOut} >LOG OUT</Button>

                </Container>
            </Navbar>
            <SongData />
        </>
    )
} 