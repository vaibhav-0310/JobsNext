import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const mongoURI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/jobsnext";

// ---------------- MIDDLEWARE ----------------
app.use(cors({credentials:true,origin:true}));
app.use(express.json({limit:"50mb"}));
app.use(express.urlencoded({extended:true,limit:"50mb"}));

// ---------------- MONGOOSE SETUP ----------------
const db=async()=>{
  try{
    await mongoose.connect(mongoURI);
  }
  catch(err){
    console.log("MongoDB connection error:", err);
  }
}

// ---------------- ROUTES ----------------
import jobScraperRoutes from './routes/jobScarper.routes.js';
import predictRoutes from './routes/predict.routes.js';

app.use('/api/predict', predictRoutes);
app.use('/api/jobs', jobScraperRoutes);
app.get("/", (_, res) => {
  res.send("JobsNext running fine");
});

// ---------------- START SERVER ----------------
app.listen(PORT, () => {
  console.log(` Server running on port http://localhost:${PORT}`);
  db()
  .then(()=>console.log("database connected"))
  .catch((e)=>console.log(e));
});
