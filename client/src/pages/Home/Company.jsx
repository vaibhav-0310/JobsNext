import React from "react";
import "./css/Home.css";
import c1 from "../../assets/c1.svg";
import c2 from "../../assets/c2.svg";
import c3 from "../../assets/c3.svg";
import c4 from "../../assets/c4.svg";
import c5 from "../../assets/c5.svg";


function Company() {
  return (
    <>
      <div className="container text-center container-companies my-5">
        <h5>
          <p>Join over 2,000 companies around the world</p>{" "}
          <p>
            that trust the <span className="colored-text"> Jobs Next </span>
            platforms
          </p>
        </h5>
        <br />
        <div className="row align-items-center justify-content-center row-cols-xl-5 row-cols-lg-5 row-cols-md-3 row-cols-3 gx-3 gy-3">
          <div class="col">
            <figure class="single-brand thumb-figure">
              <img src={c1} class="img-fluid" alt="" />
            </figure>
          </div>
          <div class="col">
            <figure class="single-brand thumb-figure">
              <img src={c2} class="img-fluid" alt="" />
            </figure>
          </div>
          <div class="col">
            <figure class="single-brand thumb-figure">
              <img src={c3} class="img-fluid" alt="" />
            </figure>
          </div>
          <div class="col">
            <figure class="single-brand thumb-figure">
              <img src={c4} class="img-fluid" alt="" />
            </figure>
          </div>
          <div class="col">
            <figure class="single-brand thumb-figure">
              <img src={c5} class="img-fluid" alt="" />
            </figure>
          </div>
        </div>
      </div>
    </>
  );
}

export default Company;
