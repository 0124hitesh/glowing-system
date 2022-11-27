import { Signup } from '../signUp/signup';
import Login from '../login/login'
import { Navbar } from '../navBar'

import { BrowserRouter, Navigate, Route, Routes} from 'react-router-dom'
import Data from '../data';
import IsLogIn from '../../actions/checkLogin';
import { useEffect, useState } from 'react';

export default function Home(props) {
    var [checkLogin, setLogin] = useState(IsLogIn());

    useEffect(() => {}, [checkLogin])
    return (
        <>
            <BrowserRouter>
                {checkLogin ? <></>: <Navbar/>}
                <Routes>
                    <Route path='/' element={IsLogIn() ?  <Navigate to="/login" replace /> : <Navigate to="/data" replace />}></Route>
                    <Route path="/login" element={<Login p1={setLogin} />}></Route>
                    <Route path="/signup" element={<Signup />}></Route>
                    <Route path='/data' element={<Data p1={setLogin}/>}></Route>
                </Routes>
            </BrowserRouter>
        </>
    )
}