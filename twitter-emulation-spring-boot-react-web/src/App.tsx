import { Navigate, Route, Routes } from 'react-router';
import { QueryParamProvider } from 'use-query-params';
import { ReactRouter6Adapter } from 'use-query-params/adapters/react-router-6';
import './App.scss';
import AuthProvider from './common/authentication/AuthProvider';
import RequireAuth from './common/authentication/RequireAuth';
import AnonymousMain from './home/AnonymousMain';
import Main from './home/Main';
import Tweets from './home/Tweets';
import Following from './home/Following';
import Followers from './home/Followers';
import Search from './home/Search';
import Login from './login/Login';
import DeleteAccount from './profile/DeleteAccount';
import Profile from './profile/Profile';
import Registration from './registration/Registration';
import NewTweet from './tweet/NewTweet';
import NotFoundComponent from './unknown/NotFoundComponent';

function App() {
    return (
        <AuthProvider>
            <QueryParamProvider adapter={ReactRouter6Adapter}>
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
