import express from 'express';
import mongoose from "mongoose";
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config()

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log('CONNECTED'))
  .catch((err) => console.log('DB error', err));

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use(cors());

const start = () => {
    app.listen(PORT, ()=> console.log('Server started on port '+ PORT))
}

start();
