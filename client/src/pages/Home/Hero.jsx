import React from 'react';
import './css/Home.css';
import banner from '../../assets/banner.svg';

function Home() {
  return (
    <>
       <div className="position-absolute bottom-0 start-0 end-0">
        <img src={banner} alt="banner" className="img-fluid w-100" />
       </div>
        <div className='container position-relative z-9 p-5'>
            <div className='row justify-content-between align-items-center'>
                <div className='col-xl-6 col-lg-6 col-md-12 col-sm-12 p-5 col-hero-home'>
                    <h6 class="text-light fw-medium d-inline-flex align-items-center mb-3"><span class="bg-green w-10 h-05 me-2"></span>Get Hot &amp; Trending Jobs</h6>
                    <h1 class="mb-4">Real Jobs, Real People, Real Success</h1>
                    <p class="fs-5">Getting a new job is never easy. Check what new jobs we have in store for you on Jobs Next AI system.</p>
                </div>
                <div className='col-xl-5 col-lg-5 col-md-12 col-sm-12  col-hero-home col-home-box offset-xl-1 offset-lg-1'>
                    <h1>Grow Your Career with <span className='colored-text'>Jobs Next AI</span></h1><br></br>
                    <span className='text-muted'>Upload your resume to get started</span>
                    <input type="file" className='form-control my-1' placeholder='Upload your resume' /><br/>
                    <div className="row">
                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6">
                            <span className='text-muted'>Perfered Location</span>
                            <input type="text" className='form-control my-1' placeholder='e.g. Mumbai, Delhi, Bangalore' />
                        </div>
                         <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6">
                            <span className='text-muted'>Perfered type</span>
                            <input type="text" className='form-control my-1' placeholder='e.g. Full-time, Part-time, Contract' />
                        </div>
                    </div><br/>
                    <span className='text-muted'>Expected salary range</span>
                    <input type="text" className='form-control my-1' placeholder='e.g. ₹5,00,000 - ₹7,00,000 PA' /><br/>
                    
                    <button className='btn btn-success w-100 my-2'>Search Result</button>
                </div>
            </div>
        </div>
      
    </>
  );
}

export default Home;
