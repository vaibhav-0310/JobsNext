import React from "react";
import "../css/Home.css";

function JobCard({type,link,img,title,skills,salary,openings,urgent}) {
  return (
    <>
      <div class="col-xl-3 col-lg-4 col-md-6 col-sm-12 card-job" style={{height:"50px !important"}}>
        <div class="job-instructor-layout border">
          <div class="left-tags-capt p-1">
            <span class="featured-text">{type}</span>
            <br />
            <span class="urgent">{urgent}</span>
          </div>
          <div class="job-instructor-thumb">
            <a href={link}>
              <img src={img} class="img-fluid" alt="" />
            </a>
          </div>
          <div class="job-instructor-content">
            <h4 class="instructor-title">
              <a href={link}>{title}</a>
            </h4>
            <div class="instructor-skills text-muted">
              {skills}
            </div>
          </div>
          <div class="job-instructor-footer">
            <div class="instructor-students">
              <h5 class="instructor-scount">{salary}</h5>
            </div>
            <div class="instructor-corses">
              <span class="c-counting">{openings} Open</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default JobCard;
