import {initBrowser, extractJobs} from "../scraper/jobScarper.js";

export const scrapeNaukriJobs = async (req, res) => {
    try {
    await initBrowser();
    const jobs = await extractJobs();
    res.json({ count: jobs.length, jobs });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Scraping failed" });
  }
}