import React from "react";
import "../../src/App.css";
import { useNavigate } from "react-router-dom";

export default function Home() {
    const navigate = useNavigate()

    const eatPizza = () => {
        console.log('Ordering some bomb Pizza...')
        navigate('pizza')
    }
    return (
        <div className="home-wrapper">
        <img
        className="home-image"
        src="https://as1.ftcdn.net/v2/jpg/01/88/69/56/1000_F_188695602_OxQE9dL43A76akLNtaMEjA8ti2sbbOPq.jpg"
        alt="cool bro with pizza"
        />
        <button id ="order-pizza" onClick={eatPizza} > Order Pizza </button>
        </div>
    )
}