import { spawn } from "child_process";
import ffmpegPath from "ffmpeg-static";
import Error from "../CustomError/Error.js";


export default function ffmpeg(input,output){
    return new Promise((resolve,reject)=>{
        const command = spawn(ffmpegPath,[
            "-i",input,
            "-ar","16000",
            "-ac","1",
            "-c:a", "pcm_s16le",
            output,
            "-y"
        ])
        
        command.on("close",(code)=>{
            if(code == 0) resolve(output);
            else reject(new Error(400,"Audio formating failed"));
        })
    })
}