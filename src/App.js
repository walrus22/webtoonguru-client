import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';
import MainNavbar from './layout/MainNavbar';
import MainLayout from './layout/MainLayout';
import Home from './components/HomePage/Home';
import WebtoonList from './components/WebtoonListPage/WebtoonList';
import WebtoonDetails from './components/WebtoonDetailPage/WebtoonDetails';
import ArtistDetails from './components/ArtistPage/ArtistDetails';
import GenreList from './components/GenrePage/GenreList';
import WeekdayList from './components/WeekdayPage/WeekdayList';
import Footer from './layout/Footer';
 
const App = () => {
 return (
        <Routes>
          <Route element={<MainLayout/>}>
            <Route path="/" element={<Home/>} />
            <Route path="/webtoon/list" element={<WebtoonList />} />
            <Route path="/webtoon/details/:id" element={<WebtoonDetails/>}/>
            <Route path="/artist/details/:id" element={<ArtistDetails/>}/>
            <Route path="/genre" element={<Navigate to="/genre/romance"/>}/>
            <Route path="/genre/:id" element={<GenreList/>}/>
            <Route path="/date/:id" element={<WeekdayList/>}/>
          </Route>
          <Route path="*" element={<div><h2>404 Page not found :(</h2></div>}/>
        </Routes>
 );
};
 
export default App;