import React, {createContext, Dispatch, SetStateAction, useState} from 'react';
import {Routes, Route} from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/Header";
import Cart from "./pages/Cart";
import NotFound from "./pages/NotFound";

import './scss/app.scss'
import Pizza from "./pages/Pizza";
import Layout from "./layouts/Layout";


const App = () => {
    return (
        <Layout>
            <Routes>
                <Route path={'/'} element={<Home/>}/>
                <Route path={'/cart'} element={<Cart/>}/>
                <Route path={'/pizza/:id'} element={<Pizza/>}/>
                <Route path={'*'} element={<NotFound/>}/>
            </Routes>
        </Layout>
    );
};

export default App;