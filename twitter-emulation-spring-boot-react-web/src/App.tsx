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
            <Route path="account/show/jsmith" element={<Main/>}/>
            <Route path="account/tweets/jsmith" element={<Tweets/>}/>
            <Route path="account/following/jsmith" element={<Following/>}/>
            <Route path="account/followers/jsmith" element={<Followers/>}/>
            <Route path="/" element={<Navigate to="account/show/jsmith" replace/>}/>
        </Routes>
    );
}

export default App;
