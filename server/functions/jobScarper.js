import puppeteer from "puppeteer";
import { getJobTitle } from "../store/jobStore.js";
// ---------------- INIT BROWSER ----------------
let browser;
let page;

async function initBrowser() {
  if (browser) return;

  const jobTitle = getJobTitle();

  if (!jobTitle) {
    throw new Error("No job title available. Run LLM prediction first.");
  }

  const searchQuery = jobTitle.toLowerCase().replace(/\s+/g, "-");
  const url = `https://www.naukri.com/${searchQuery}-jobs`;

  browser = await puppeteer.launch({
    executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
    headless: false,
    slowMo: 40,
    args: ["--start-maximized"],
    defaultViewport: null,
  });

  page = await browser.newPage();

  await page.goto(url, {
    waitUntil: "networkidle2",
    timeout: 90000,
  });

  console.log(`🔍 Searching jobs for: ${jobTitle}`);
}



// ---------------- SCROLL ----------------
async function autoScroll() {
  for (let i = 0; i < 8; i++) {
    await page.evaluate(() => {
      window.scrollBy(0, window.innerHeight);
    });
    await new Promise(r => setTimeout(r, 2000));
  }
}


// ---------------- EXTRACT JOBS ----------------
async function extractJobs() {
  await autoScroll();

  const jobs = await page.evaluate(() => {
    let cards = document.querySelectorAll(".jobTuple");

    if (cards.length === 0) {
      cards = document.querySelectorAll("article");
    }

    if (cards.length === 0) {
      cards = document.querySelectorAll("div[class*='job']");
    }

    return Array.from(cards).map(job => ({
      title:
        job.querySelector("a.title")?.innerText.trim() ||
        job.querySelector("a")?.innerText.trim() ||
        "",
      company:
        job.querySelector("a.comp-name.mw-25")?.innerText.trim() ||
        job.querySelector(".subTitle")?.innerText.trim() ||
        "",
      location:
        job.querySelector(".locWdth")?.innerText.trim() ||
        job.querySelector(".location")?.innerText.trim() ||
        "",
      experience:
        job.querySelector(".expwdth")?.innerText.trim() || "",
      link:
        job.querySelector("a.title")?.href ||
        job.querySelector("a")?.href ||
        "",
      logo:job.querySelector(".logoImage")?.src || ""
    }));
  });

  const cleanJobs = jobs.filter(j => j.title && j.link);

  console.log(`✅ Extracted ${cleanJobs.length} jobs`);
  return cleanJobs;
}

export {initBrowser, extractJobs};