import { Navigate, Route, Routes } from 'react-router';
import { QueryParamProvider } from 'use-query-params';
import './App.scss';
import AnonymousMain from './home/AnonymousMain';
import AuthProvider from './common/authentication/AuthProvider';
import DeleteAccount from './profile/DeleteAccount';
import Followers from './home/Followers';
import Following from './home/Following';
import Login from './login/Login';
import Main from './home/Main';
import NewTweet from './tweet/NewTweet';
import NotFoundComponent from './unknown/NotFoundComponent';
import Profile from './profile/Profile';
import ReactRouterAdapter from './common/ReactRouterAdapter.ts';
import Registration from './registration/Registration';
import RequireAuth from './common/authentication/RequireAuth';
import Search from './home/Search';
import Tweets from './home/Tweets';

function App() {
    return (
        <AuthProvider>
            <QueryParamProvider adapter={ReactRouterAdapter}>
                <Routes>
                    <Route path="login" element={<Login/>}/>
                    <Route path="account/register" element={<Registration/>}/>
                    <Route path="account/show/:user" element={<Main/>}/>
                    <Route path="account/show" element={
                        <RequireAuth><AnonymousMain/></RequireAuth>}/>
                    <Route path="account/tweets/:user" element={<Tweets/>}/>
                    <Route path="account/following/:user" element={<Following/>}/>
                    <Route path="account/followers/:user" element={<Followers/>}/>
                    <Route path="account/profile" element={
                        <RequireAuth><Profile/></RequireAuth>}/>
                    <Route path="account/delete" element={
                        <RequireAuth><DeleteAccount/></RequireAuth>}/>
                    <Route path="account/search" element={
                        <RequireAuth><Search/></RequireAuth>}/>
                    <Route path="tweet" element={
                        <RequireAuth><NewTweet/></RequireAuth>}/>
                    <Route path="/" element={<Navigate to="account/show" replace/>}/>
                    <Route path="*" element={<NotFoundComponent/>}/>
                </Routes>
            </QueryParamProvider>
        </AuthProvider>
    );
}

export default App;
