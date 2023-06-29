import React from "react";
import { Routes, Route } from "react-router";
import Login from "./components/Login";


const Router = () => {
    return (
        <Routes>
            <Route path="/login" element={ <Login /> }/>
        </Routes>
    )
}

export default Router;