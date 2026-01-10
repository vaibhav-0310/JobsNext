import React from 'react';
import './css/Home.css';

function NewsLetter() {
    return ( 
        <>
        <div className="container-fluid newsletter-container mt-5 p-5 h-50 text-center text-white">
            <h1 className='mt-5'>
                Subscribe to our Newsletter!
            </h1>  
            <p className='mb-4'>
                Stay updated with the latest job postings and career advice.
            </p>
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="input-group p-3">
                        <input type="email" className="form-control p-3" placeholder="Enter your email" aria-label="Recipient's email" aria-describedby="button-addon2"/>
                        <button className="btn btn-dark" type="button" id="button-addon2">Subscribe</button>
                    </div>
                </div>
            </div>
        </div>
        </>
     );
}

export default NewsLetter;