import React from "react";
import Header from "./Header";
import { Outlet, useLocation } from "react-router-dom";
import { Navigation, Search } from "../Public";
import { Intro, Contact } from "../../components";
import { useSelector } from 'react-redux'
import Footer from "../../components/Footer";
import { path } from "../../ultis/constant";
const Home = () => {
    const {isLoggedIn} = useSelector(state => state.auth)
    const location = useLocation()
    return (
        <div className="w-full gap-4 m-auto h-full flex flex-col items-center">
            <Header />
            <Navigation />
            {isLoggedIn && (location.pathname !== `/${path.CONTACT}`) && (location.pathname.split('/')[1] !== `chi-tiet`) && <Search />}
            <div className="md:w-4/5 flex flex-col items-center justify-start pt-4">
                <Outlet />
            </div>
            <Intro />
            <Contact />
            <Footer />
        </div>
    );
};

export default Home;
