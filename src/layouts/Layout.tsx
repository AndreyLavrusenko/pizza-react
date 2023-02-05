import React from 'react';
import Header from "../components/Header";

const Layout = ({children}: { children: React.ReactElement }) => {
    return (
        <div className="wrapper">
            <Header />
            <div className="content">
                {children}
            </div>
        </div>
    );
};

export default Layout;