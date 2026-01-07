import React from 'react';
import Hero from './Hero.jsx';
import './css/Home.css';
import Nav from './Nav.jsx';

function Home() {
    return ( 
        <>
        <div className="home-page">
        <Nav/>
        <Hero/>
        </div>
        </>
     );
}

export default Home;