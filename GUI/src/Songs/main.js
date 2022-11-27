import React, { useState, useEffect } from 'react';
import '../../node_modules/bootstrap/dist/css/bootstrap.css'
import { Container, Table, Button } from 'react-bootstrap';
import axios from 'axios';
import Card from './card';
import './card.css'

import { Rating } from 'react-simple-star-rating'
import loadingScreen from '../assets/loading.gif'

export default function SongData() {
    const noOfPages = 2;
    var [songList, setList] = useState([]);
    var [newSong, setNewSong] = useState(false);
    var [laodingGIF, setLoad] = useState(true);
    var [totalItems, setItems] = useState();
    var [curPage, setCurPage] = useState(0);

    useEffect(() => {
        getSongs();
    }, [])

    var buttonCol = (
        <>
            {
                Array.from(Array(totalItems)).map((x, index) => {
                    return (
                        <button type="button" className="btn btn-info" key={index} onClick={pageBtn} value={index + 1}>
                            {index + 1}
                        </button>
                    )
                })
            }
        </>
    )

    var showList = (
        <>
            {songList.slice(curPage, curPage + noOfPages).map((x, index) => {
                const z = arrayBufferToBase64(x.pic.data.data)
                const imgSrc = "data:image/jpg;base64," + z
                return (
                    <tr key={index}>
                        <td><img src={imgSrc} alt="imag" style={{ width: "100px", height: "100px" }} /></td>
                        <td>{x.song}</td>
                        <td>{x.rd}</td>
                        <td>{x.artist}</td>
                        <td>
                            <Rating ratingValue={x.ratings * 20} readonly size={25} />
                        </td>
                    </tr>
                )
            })}
        </>
    )

    function pageBtn(e) {
        var x = e.target.value;
        x = (x - 1) * 2
        setCurPage(x);
    }

    function getSongs() {
        axios.get('/songAPI/songs').then(async (res) => {
            setList((res.data)[0])
            var numPage = (res.data)[1]
            numPage = parseInt(numPage / 2) + numPage % 2
            setItems(numPage)
            setLoad(false)
            console.log('a')
        })
    }

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
            <Container className="container d-flex justify-content-between">
                <article className='p-md-3'>Songs (sort by rating)</article>
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
                <tbody>
                    {showList}
                </tbody>

            </Table>

            {laodingGIF ? <img src={loadingScreen} alt="imag" style={{ width: "370px", height: "250px" }} className="loadingImage" /> : null}
            {newSong ? <Card p1={show} p2={getSongs} /> : null}
            <section id='buttonCol'>
                {buttonCol}
            </section>
        </>
    )
}