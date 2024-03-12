import React from 'react';
import Navbar from '../components/navbar.jsx';
import { BackgroundGradientAnimation } from '../ui/home-background-animation.jsx';


const Home = () => {
    return(
        <BackgroundGradientAnimation style={{ position: 'relative', zIndex: 1 }}>
        <div className="absolute z-50 inset-0 flex items-center justify-center text-white 
        font-bold px-4 pointer-events-none text-3xl text-center md:text-4xl lg:text-7xl"></div>
        <div className="center-container text-white">
        <h1 className="bg-clip-text text-transparent drop-shadow-2xl 
        bg-gradient-to-b from-white/80 to-white/20"> Kafka Kare</h1>
        <div><Navbar /></div> 
        </div>
        </BackgroundGradientAnimation>        
    )

};

export default Home;