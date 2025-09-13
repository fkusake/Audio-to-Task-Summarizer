// INTERNAL DEPENDENCIES :
import fs from "fs";
import { AssemblyAI } from "assemblyai";


const ASRModel = async (FFmpegFileName) => {
  try {
    let output = {};

    const client = new AssemblyAI({
      apiKey: `${process.env.ASSEMBLY_KEY}`
    });


    const audioFile = fs.createReadStream(`./FFmpegOutput/${FFmpegFileName}`);

    const params = {
      audio: audioFile,
      speech_model: "universal",
      punctuate: true,
      format_text: true,
      word_boost: [],
      speaker_labels: true
    };

    const transcript = await client.transcripts.transcribe(params);
    output.conversation = transcript.text;
    return output;
  } catch (error) {
    console.error("Error during transcription:", error);
  }
};

export default ASRModel;
