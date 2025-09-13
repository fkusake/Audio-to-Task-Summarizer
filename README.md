# AI-Powered Meeting Assistant

An AI-driven meeting assistant that converts **raw audio recordings** into structured insights such as:
- **Speaker-labeled transcripts**
- **Meeting summaries**
- **Actionable task items** with owners and suggested due dates  

This project is designed to save time, reduce manual note-taking, and ensure accountability in team discussions.

---

##  Overview
The application processes meeting audio and delivers:
- Accurate **transcripts with timestamps**
- **Speaker diarization** for multi-speaker clarity
- **Smart summarization** for concise takeaways
- **Action item extraction** with task owners and suggested due dates

---

##  Pipeline Flow
1. **Audio Upload & Preprocessing**  
   - **Input:** Meeting audio file  
   - **Processing:** Clean, trim, and normalize audio using **FFmpeg** for improved recognition  

2. **Automatic Speech Recognition (ASR)**  
   - **Technology:** [AssemblyAI](https://www.assemblyai.com/)  
   - Generates raw transcripts with accurate timestamps  

3. **Speaker Diarization**  
   - **Technology:** AssemblyAI  
   - Segments transcript by speaker to produce a **speaker-labeled transcript**  

4. **Summarization & Action Extraction**  
   - **Technology:** Gemini AI (LLM with structured prompt templates)  
   - **Process:**  
     - Break transcript into chunks  
     - Generate concise **meeting summary**  
     - Extract **action items** (task, owner, suggested due date)

---

##  Tech Stack
- **Backend Framework:** Node.js with Express.js (MVC architecture)  
- **Audio Preprocessing:** FFmpeg  
- **ASR + Diarization:** AssemblyAI APIs  
- **Summarizer & Action Extractor:** Gemin

##  Key Features
-  Accurate transcripts with timestamps  
-  Speaker diarization for clear multi-speaker identification  
-  Smart summarization with concise takeaways  
-  Action item extraction with owner & due date suggestions  

---

##  Impact
- Saves **hours of manual note-taking** after meetings  
- Improves **team productivity** by highlighting clear action items  
- Provides a scalable foundation for **enterprise-level meeting automation tools**

---
