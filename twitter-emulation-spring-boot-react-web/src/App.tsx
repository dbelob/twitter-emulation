import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Account from './home/Account';
import Tweets from './home/Tweets';

function App() {
    return (
        <Routes>
            <Route path="account/show/jsmith" element={<Account/>}/>
            <Route path="account/tweets/jsmith" element={<Tweets/>}/>
            <Route path="/" element={<Navigate to="account/show/jsmith" replace/>}/>
        </Routes>
    );
}

export default App;
