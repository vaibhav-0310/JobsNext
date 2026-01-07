import React from 'react';
import Hero from './Hero.jsx';
import './css/Home.css';
import Nav from './Nav.jsx';
import Company from './Company.jsx';

function Home() {
    return ( 
        <>
        <div className="home-page">
        <Nav/>
        <Hero/>
        <Company/>
        </div>
        </>
     );
}

export default Home;