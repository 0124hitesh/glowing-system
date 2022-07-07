import React, { useState, useEffect } from 'react';
import '../../node_modules/bootstrap/dist/css/bootstrap.css'
import { Navbar, Container, Table, Form, FormControl, Button } from 'react-bootstrap';
import axios from 'axios';
import Card from './card';
import './card.css'

import ReactStars from "react-rating-stars-component";
import laodingScreen from '../assets/loading.gif'


export default function A() {
    var [songList, setList] = useState([]);
    var [newSong, setNewSong] = useState(false);
    var [laodingGIF, setLoad] = useState(true)

    useEffect(() => {
        getSongs();
    }, [])

    function getSongs(){
        axios.get('/songs').then(async (res) => {
            setList((res.data)[0])
            setLoad(false)
            console.log('a')
        })
    }

    var showList = (
        <tbody>
            {songList.map((x, index) => {
                const z = arrayBufferToBase64(x.pic.data.data)
                const imgSrc = "data:image/jpg;base64," + z
                return (
                    <tr key={index}>
                        <td><img src={imgSrc} alt="imag" style={{ width: "100px", height: "100px" }} /></td>
                        <td>{x.song}</td>
                        <td>{x.rd}</td>
                        <td>{x.artist}</td>
                        <td>
                            <ReactStars
                                count={5}
                                value={x.ratings}
                                size={24}
                                activeColor="#ffd700" />
                        </td>
                    </tr>
                )
            })}
        </tbody>
    )

    function show() {
        setNewSong(
            newSong ? false : true
        )
    }

    function arrayBufferToBase64(buffer) {
        var binary = '';
        var bytes = [].slice.call(new Uint8Array(buffer));
        bytes.forEach((b) => binary += String.fromCharCode(b));
        return window.btoa(binary);
    }

    return (
        <>
            <Navbar bg="light" variant="light">
                <Container>
                    <Navbar.Brand href="#home">Home</Navbar.Brand>

                    {/* <Nav className="me-auto">
                        <Nav.Link href="#home">Home</Nav.Link>
                    </Nav> */}

                    <Form className="d-flex">
                        <FormControl
                            type="search"
                            placeholder="Search"
                            className="me-2"
                            aria-label="Search"
                        />
                        <Button variant="outline-success">Search</Button>
                    </Form>
                </Container>
            </Navbar>
            <br />

            <Container className="container d-flex justify-content-between">
                <article className='p-md-3'>Top 10 Songs</article>
                <Button variant="primary" size="lg" active onClick={show}>
                    + ADD SONG
                </Button>
            </Container>
            <br />

            <Table striped bordered hover variant="light">
                <thead>
                    <tr>
                        <th>Artist</th>
                        <th>Song</th>
                        <th>Release Date</th>
                        <th>Artist</th>
                        <th>Rate</th>
                    </tr>
                </thead>
                {showList}

            </Table>

            {laodingGIF ? <img src={laodingScreen} alt="imag" style={{ width: "370px", height: "250px" }} className="loadingImage" /> : null}
            {newSong ? <Card p1={show} p2={getSongs} /> : null}
        </>
    )
}