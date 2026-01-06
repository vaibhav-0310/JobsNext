import express from 'express';
import {scrapeNaukriJobs} from '../controllers/jobScarper.controllers.js';

const router = express.Router();

router.get('/scrape-naukri', scrapeNaukriJobs);

export default router;