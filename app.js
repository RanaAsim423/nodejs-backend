import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import cors from 'cors'
import connectDB from './config/connectdb.js'
import portalRoutes from "./routes/portalRoutes.js";
import frontEndRoutes from "./routes/frontEndRoutes.js";
import bodyParser from "body-parser";
import os from "os";
import fileUpload from "express-fileupload";

const app = express()
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const options = {
    uploadDir: os.tmpdir(),
    autoClean: true
};
app.use(fileUpload());
app.use(express.static('public'))


// cors policy
app.use(cors())

const port = process.env.PORT
const DATABASE_URL = process.env.DATABASE_URL
// DatabaseConnection
connectDB(DATABASE_URL)
// json
// app.use(express.json())

// access to routes
// app.use("/api/user",userRoutes)
app.use("/api/portal",portalRoutes)
app.use("/api/App",frontEndRoutes)


app.listen(port, ()=>{
    console.log(`server listening at http://localhost:${port}`)
})

