import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Main from './home/Main';
import Tweets from './home/Tweets';
import Following from './home/Following';
import Followers from './home/Followers';

function App() {
    return (
        <Routes>
            <Route path="account/show/:user" element={<Main/>}/>
            <Route path="account/tweets/:user" element={<Tweets/>}/>
            <Route path="account/following/:user" element={<Following/>}/>
            <Route path="account/followers/:user" element={<Followers/>}/>
            <Route path="/" element={<Navigate to="account/show/jsmith" replace/>}/>
        </Routes>
    );
}

export default App;
