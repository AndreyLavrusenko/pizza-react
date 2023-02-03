import React, {createContext, Dispatch, SetStateAction, useState} from 'react';
import {Routes, Route} from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/Header";
import Cart from "./pages/Cart";
import NotFound from "./pages/NotFound";

import './scss/app.scss'


interface IContext {
    searchValue: string,
    setSearchValue: Dispatch<SetStateAction<string>>
}

export const SearchContext = createContext<IContext>({
    setSearchValue: () => {},
    searchValue: "",
})


const App = () => {
    const [searchValue, setSearchValue] = useState("")

    return (
        <div className="wrapper">
            <SearchContext.Provider value={{searchValue, setSearchValue}}>
                <Header />
                <div className="content">
                    <Routes>
                        <Route path={'/'} element={<Home/>}/>
                        <Route path={'/cart'} element={<Cart/>}/>
                        <Route path={'*'} element={<NotFound/>}/>
                    </Routes>
                </div>
            </SearchContext.Provider>
        </div>
    );
};

export default App;