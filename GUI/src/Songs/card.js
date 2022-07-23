import React, { useState } from 'react';
import axios from 'axios'
import '../../node_modules/bootstrap/dist/css/bootstrap.css'

export default function Card(props) {

    var [pic, setPic] = useState("")
    var [imgSrc, setSrc] = useState("");
    var [artist, setArtist] = useState("");
    var [song, setSong] = useState("");
    var [rd, setDate] = useState('');
    var [ratings, setRat] = useState("");

    function f_artist(e) {
        setArtist(e.target.value)
    }

    function f_song(e) {
        setSong(e.target.value)
    }

    function f_rd(e) {
        setDate(e.target.value);
    }

    function f_ratings(e) {
        setRat(e.target.value);
    }

    async function addSong() {
        var fdata = new FormData();

        fdata.append("pic", pic);
        fdata.append("artist", artist);
        fdata.append("song", song);
        fdata.append("rd", rd)
        fdata.append("ratings", ratings);

        await axios.post('/songAPI/newSong', fdata).then((res) => {
            if (res.status === 200)
                props.p2();
            alert(res.data)
        }).catch((e) => {
            alert(e.response.data)
        })

        props.p1();
    }

    async function setImage(e) {
        //    var reader = new FileReader();
        //    reader.readAsDataURL(e.target.files[0]);
        //    setPic(reader)

        const im = e.target.files[0];
        setPic(im)
        setSrc(URL.createObjectURL(e.target.files[0]));
    }

    return (
        <>
            <section id='insert' className='bordered border-dark container mt-3'>
                <form>
                    <input type="file" accept="image/png, image/gif, image/jpeg, image/jpg" className="" onChange={setImage} /><br /><br />
                    Artist <input type="text" value={artist} onChange={f_artist}></input><br /><br />
                    Song <input type="text" value={song} onChange={f_song}></input><br /><br />
                    Release Date <input type="date" value={rd} onChange={f_rd}></input><br /><br />
                    Ratings <input type="number" max={5} min={1} value={ratings} onChange={f_ratings}></input><br /><br />
                    <button type="button" onClick={props.p1}>Cancel </button>
                    <span> </span>
                    <button type="button" onClick={addSong}> ADD USER</button>
                </form>
                <img src={imgSrc} alt="imag" style={{ width: "100px", height: "100px" }} />

            </section>
        </>
    )
}