import React from 'react';
import Hero from './Hero.jsx';
import './css/Home.css';
import Nav from './Nav.jsx';
import Company from './Company.jsx';
import Jobs from './Jobs.jsx';

function Home() {
    return ( 
        <>
        <div className="home-page">
        <Nav/>
        <Hero/>
        <Company/>
        <Jobs/>
        </div>
        </>
     );
}

export default Home;