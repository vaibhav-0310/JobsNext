import express from 'express';
import { getPrediction,pdfUpload } from '../controllers/Predict.controller.js';

const router = express.Router();

router.post('/predict', getPrediction);
router.post('/upload-pdf', pdfUpload);

export default router;