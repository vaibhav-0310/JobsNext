import React, { useEffect,useState } from "react";
import "./css/Home.css";
import banner from "../../assets/banner.svg";
import axios from "axios";
import { createContext } from "react";

 export const ResumeContext = createContext();

function Home() {
  const [resumeFile, setResumeFile] = useState(null);
  const [resumeData, setResumeData] = useState(null);
  const handleFileChange = (event) => {
    setResumeFile(event.target.files[0]);
  };
  const handleResumeParse = async () => {
    if (!resumeFile) {
      alert("Please upload a resume file.");
      return;
    }
    const formData = new FormData();
    formData.append("resume", resumeFile);
    try{
      let response = await axios.post("/api/predict/upload-pdf", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log(response);
      let keyword=await axios.post("/api/predict/predict",response.data.preview);
      console.log(keyword);
      setResumeData(keyword.data);
    } catch (error) {
      console.error("Error uploading resume:", error);
    }
  };
  return (
     <ResumeContext.Provider value={resumeData}>
    <>
      <div className="position-absolute bottom-0 start-0 end-0">
        <img src={banner} alt="banner" className="img-fluid w-100" />
      </div>
      <div className="container position-relative z-9 p-5">
        <div className="row justify-content-between align-items-center">
          <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 ps-0 pe-5 col-hero-home">
            <h6 class="text-light fw-medium d-inline-flex align-items-center mb-3">
              <span class="bg-green w-10 h-05 me-2"></span>Get Hot &amp;
              Trending Jobs
            </h6>
            <h1 class="mb-4" style={{ fontSize: "3.5em" }}>
              Real Jobs, Real People, Real Success
            </h1>
            <p class="fs-5" style={{ fontSize: "1.5 rem" }}>
              Getting a new job is never easy. Check what new jobs we have in
              store for you on Jobs Next AI system.
            </p>
            <div class="lios-vrst">
              <ul>
                <li>
                  <div class="lios-parts">
                    <h2>
                      <span class="ctr">20</span>
                      <span class="text-main">M</span>
                    </h2>
                    <h6>Active Jobs</h6>
                  </div>
                </li>

                <li>
                  <div class="lios-parts">
                    <h2>
                      <span class="ctr">40</span>
                      <span class="text-main">K</span>
                    </h2>
                    <h6>Startups</h6>
                  </div>
                </li>

                <li>
                  <div class="lios-parts">
                    <h2>
                      <span class="ctr">340</span>
                      <span class="text-main">K</span>
                    </h2>
                    <h6>Talents</h6>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-xl-5 col-lg-5 col-md-12 col-sm-12  col-hero-home col-home-box offset-xl-1 offset-lg-1">
            <h1>
              Grow Your Career with{" "}
              <span className="colored-text">Jobs Next AI</span>
            </h1>
            <br></br>
            <span className="text-muted">
              Upload your resume to get started
            </span>
            <input
              type="file"
              accept=".pdf"
              className="form-control my-1"
              placeholder="Upload your resume"
              onChange={handleFileChange}
            />
            <br />
            <div className="row">
              <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6">
                <span className="text-muted">Perfered Location</span>
                <input
                  type="text"
                  className="form-control my-1"
                  placeholder="e.g. Mumbai, Delhi, Bangalore"
                />
              </div>
              <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6">
                <span className="text-muted">Perfered type</span>
                <input
                  type="text"
                  className="form-control my-1"
                  placeholder="e.g. Full-time, Part-time, Contract"
                />
              </div>
            </div>
            <br />
            <span className="text-muted">Expected salary range</span>
            <input
              type="text"
              className="form-control my-1"
              placeholder="e.g. ₹5,00,000 - ₹7,00,000 PA"
            />
            <br />

            <button
              className="btn btn-success w-100 my-2"
              onClick={handleResumeParse}
            >
              Search Result
            </button>
          </div>
        </div>
      </div>
    </>
    </ResumeContext.Provider>
  );
}

export default Home;
