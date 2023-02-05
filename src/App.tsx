import React, {Suspense} from 'react';
import {Routes, Route} from "react-router-dom";
import Layout from "./layouts/Layout";
import Preloader from "./common/Preloader";

const Cart = React.lazy(() => import("./pages/Cart"));
const Pizza = React.lazy(() => import("./pages/Pizza"));
const NotFound = React.lazy(() => import("./pages/NotFound"));
const Home = React.lazy(() => import("./pages/Home"));

import './scss/app.scss'


const App = () => {
    return (
        <Layout>
            <Suspense fallback={<Preloader />}>
                <Routes>
                    <Route path={'/'} element={<Home/>}/>
                    <Route path={'/cart'} element={<Cart/>}/>
                    <Route path={'/pizza/:id'} element={<Pizza/>}/>
                    <Route path={'*'} element={<NotFound/>}/>
                </Routes>
            </Suspense>
        </Layout>

    );
};

export default App;