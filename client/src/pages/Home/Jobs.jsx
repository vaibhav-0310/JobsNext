import React from "react";
import JobCard from "./components/JobCard";
import "./css/Home.css";

function Jobs() {
  const data = [
    {
      type: "Internship",
      link: "https://apply.careers.microsoft.com",
      img: "https://media.licdn.com/dms/image/v2/D560BAQH32RJQCl3dDQ/company-logo_100_100/B56ZYQ0mrGGoAU-/0/1744038948046/microsoft_logo?e=1769644800&v=beta&t=Rq1IoK4m5G-P8Z6Lmx1aZfUNTbgYsRUQJGO7xYXqp8Y",
      title: "Software Engineering Intern",
      skills: "Java, Python, C++",
      salary: "$5K - $8K",
      openings: 6,
      urgent: "Urgent",
    },
    {
      type: "Full Time",
      link: "https://careers.google.com",
      img: "https://media.licdn.com/dms/image/v2/D4E0BAQHIL3HctxNfvg/company-logo_100_100/B4EZokv7VQIUAQ-/0/1761553135376/capgemini_logo?e=1769644800&v=beta&t=rYYpblcpa2cAF6fYKFI8Yj1FkoMniiNXPoK00gK9X74",
      title: "Software Engineer",
      skills: "React, JavaScript, CSS",
      salary: "$90K - $120K",
      openings: 4,
      urgent: "Urgent",
    },
    {
      type: "Remote",
      link: "https://careers.amazon.com",
      img: "https://media.licdn.com/dms/image/v2/D560BAQFz1apPGEyk7g/company-logo_100_100/B56ZfOL01vHUAQ-/0/1751510896876/accentureindia_logo?e=1769644800&v=beta&t=kAnrIrhW21MTEIKgoVqmh6RqJcpb_cr4N8peGIrbLEM",
      title: "Full Stack Engineer",
      skills: "Node.js, MongoDB, AWS",
      salary: "$4K - $6K",
      openings: 10,
      urgent: "Best place to work",
    },
    {
      type: "Full Time",
      link: "https://jobs.netflix.com",
      img: "https://media.licdn.com/dms/image/v2/D4D0BAQGsGR9p4ikS5w/company-logo_100_100/company-logo_100_100/0/1708946550425/tata_consultancy_services_logo?e=1769644800&v=beta&t=K8XAszVxL2j8cS5ufYtfit-goSfzFp1-RRtjyLdORIU",
      title: "Frontend Developer",
      skills: "Figma, UX Research, Prototyping",
      salary: "$80K - $110K",
      openings: 3,
      urgent: "Best opportunity",
    },
    {
      type: "Full Time",
      link: "https://careers.meta.com",
      img: "https://media.licdn.com/dms/image/v2/D560BAQE52I3UW6wFMg/company-logo_100_100/company-logo_100_100/0/1691578957554/growwin_logo?e=1769644800&v=beta&t=tStwnSAD-9vEFf68-v7Jy6igOMP2zdSOX4rQVsUymqw",
      title: "Web Developer (SDE 4)",
      skills: "React, Redux, TypeScript",
      salary: "$100K - $140K",
      openings: 5,
      urgent: "Best salary",
    },
    {
      type: "Remote",
      link: "https://careers.ibm.com",
      img: "https://media.licdn.com/dms/image/v2/D4E0BAQFTFdGNe-V9tw/company-logo_100_100/B4EZpFMu4WIQAQ-/0/1762097557732?e=1769644800&v=beta&t=CFWRljuEkY0CNVSFzMNTax1_FTscy33o8l4L2K0bHT0",
      title: "Developer L2",
      skills: "Python, ML, Pandas",
      salary: "$4K - $7K",
      openings: 8,
      urgent: "Urgent",
    },
    {
      type: "Full Time",
      link: "https://careers.spotify.com",
      img: "https://media.licdn.com/dms/image/v2/D560BAQEv67uGFge5Sw/company-logo_100_100/B56ZfEsEVpHoAU-/0/1751351576332/infosys_logo?e=1769644800&v=beta&t=aQPzOgdoLnSUvMp8xxXF8yIcp302vFaV_K0GrIEB5r4",
      title: "Java Web Developer",
      skills: "Java, SpringBoot, iOS",
      salary: "$85K - $115K",
      openings: 2,
      urgent: "Best opportunity",
    },
    {
      type: "Internship",
      link: "https://careers.adobe.com",
      img: "https://media.licdn.com/dms/image/v2/C4D0BAQEC3n4yU_w6bQ/company-logo_100_100/company-logo_100_100/0/1630541053165/walmartglobaltechindia_logo?e=1769644800&v=beta&t=6k_YS-ufQkwNNpXmYgETxqAlZy3YZY52qMQKVgY3Nog",
      title: "Grad Intern",
      skills: "MERN, REST APIs, Docker",
      salary: "$95K - $130K",
      openings: 6,
      urgent: "Urgent",
    },
  ];

  return (
    <>
      <div className="container text-center mb-5">
        <h2>Featured Jobs</h2>
        <p>Explore exciting job opportunities tailored for you, right here.</p>
      </div>
      <div class="container">
        <div class="row justify-content-center gx-xl-3 gx-3 gy-4">
          {data.map((job, index) => (
            <JobCard key={index} {...job} />
          ))}
        </div>
      </div>
    </>
  );
}

export default Jobs;
