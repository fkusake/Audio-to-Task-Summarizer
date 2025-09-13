// INTERNAL DEPENDENCIES :
import ffmpeg from "../../FFmpegConfig/FFmpegConfig.js";
import ASRModel from "../../ASRConfig/AssemblyAI.js";
import GeminiAI from "../../LLM/Gemini.js";

export default class Controller {

    constructor() {
        this.output = null;
        this.diarization = this.diarization.bind(this);
        this.summarizer = this.summarizer.bind(this);
    }

    getLandingPage(req, res, next) {
        return res.status(200).render("index");
    }

    async audioFormat(req, res, next) {
        try {
            let FFmpegFileName = Date.now() + "-" + "FFmpeg.wav";
            await ffmpeg(`uploads/${req.file.filename}`, `FFmpegOutput/${FFmpegFileName}`);
            return res.redirect(`/diarization/${FFmpegFileName}`);
        } catch (error) {
            console.log(error);
            next(error);
        }
    }

    async diarization(req, res, next) {
        try {
            const FFmpegFile = req.params.id;
            this.output = await ASRModel(FFmpegFile);
            return res.redirect("/summarizer")
        } catch (error) {
            console.log(error);
            next(error)
        }
    }


    async summarizer(req, res, next) {
        try {
            const aiModel = GeminiAI();
            let allSummaries = [];
            let allActions = [];
            let speakerMap;
                const prompt = `You are an AI that analyzes meeting transcripts.

                                Task 1: Write a concise summary (2-3 sentences) of the following text.
                                Task 2: Extract action items in JSON format:
                                Task 3: Identify who each speaker might be.
                                Transcript:${this.output.conversation}
                                Output JSON like:
                                {
                                summary:"",
                                actions:
                                [
                                {"task": "...", "owner": "...", "due_date": "... or null"}
                                ],
                                speakerMap:
                                { "Speaker A": "Professor", "Speaker B": "Aaron" }
                                }`
                    ;

                const aiData = await aiModel.invoke(prompt);

                let textOutput = aiData.content;

                textOutput = textOutput.replace(/```json|```/g, "").trim();

                let result;
                try {
                    result = JSON.parse(textOutput);
                } catch {
                    result = { summary: textOutput, actions: [] };
                }
                if (!speakerMap) {
                    speakerMap = result.speakerMap;
                }
                allSummaries.push(result.summary);
                if (result.actions) {
                    allActions.push(...result.actions);
                }
            const finalSummary = allSummaries.join(" ");
            const response = { text: this.output.conversation, summary: finalSummary, actions: allActions, speakerMap: speakerMap };
            return res.status(200).json({response:response});
        } catch (error) {
            console.log(error);
            next(error);
        }
    }
}