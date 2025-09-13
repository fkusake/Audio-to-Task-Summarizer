// EXTERNAL DEPENDENCIES :
import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import ejs from "ejs";
import path from "path";

// INTERNAL DEPENDENCIES :
import multerConfig from "./FileConfig/FileConfig.js";
import Controller from "./src/controller/controller.js";


// SERVER : 
const server = express();


// APPLICATION LEVEL MIDDLEWARE:
server.use(cors());
server.use(express.static("uploads"));


// EJS CONFIG :
server.set("view engine","ejs");
server.set("views",path.join(path.resolve(),"src","views"));
server.use(express.static("src/views"));


// INSTANCE OF CONTROLLER :
const controller = new Controller();


// ROUTES :
server.get("/", controller.getLandingPage);

server.get("/diarization/:id",controller.diarization);

server.get("/summarizer",controller.summarizer);

server.post("/format", multerConfig.single("audio"),controller.audioFormat);

server.use((error, req, res, next) => {
    if (error.status) {
        return res.status(error.status).send(error.message);
    } else {
        return res.status(500).send("Internal Server issuse...!!!");
    }
})


server.listen(process.env.PORT,() => {
    console.log("Server is running at port number 3000");
})
