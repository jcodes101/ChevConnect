# 💼 ChevConnect

ChevConnect is a smart, AI-powered resume and LinkedIn profile matcher designed to help job seekers assess how well their skills align with real job and internship opportunities at **Chevron**. By leveraging OpenAI's GPT model, ChevConnect intelligently parses uploaded resumes (PDF format) or LinkedIn profiles and compares the extracted skills against job descriptions scraped from Chevron.com.



[![Watch the video](https://img.youtube.com/vi/HO4uK22G0gg/maxresdefault.jpg)](https://youtu.be/HO4uK22G0gg)



---

## 🚀 Features

- 📄 **Resume Dropzone Upload** – Upload your PDF resume with ease.
- 🔗 **LinkedIn Profile Analysis** – Paste your LinkedIn profile URL for instant parsing.
- 🤖 **AI-Powered Parsing** – Uses OpenAI's GPT API to extract key skills and insights.
- 🧠 **Smart Matching** – Compares resume/LinkedIn data with Chevron job requirements.
- 📊 **Skill Comparison** – Visual feedback on how well your qualifications match the position.
- 🔒 **Secure API Key Integration** – Backend securely communicates with OpenAI.

---

## 🧰 Tech Stack

| Layer     | Tech                              |
|-----------|-----------------------------------|
| Frontend  | React, Dropzone, Tailwind CSS     |
| Backend   | Node.js, Express                  |
| AI Model  | OpenAI GPT API                    |
| Parsing   | `pdf-parse`, Custom Text Extractors |
| Hosting   | (Optional: Vercel, Netlify, Render) |

---

## 📁 Folder Structure

chevconnect/ ├── backend/ │ ├── resumeParser.js # Handles PDF and LinkedIn parsing │ ├── openaiService.js # Sends content to OpenAI and retrieves response │ └── routes.js # API endpoints for file and URL submissions ├── frontend/ │ ├── components/ │ │ ├── Dropzone.jsx # Drag and drop component for file uploads │ │ └── ResultDisplay.jsx # Shows match results │ └── App.jsx ├── .env ├── package.json ├── README.md └── server.js


---

## 🛠️ Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/chevconnect.git
cd chevconnect

npm install

OPENAI_API_KEY=your_openai_api_key_here

npm run dev

💡 How It Works
User uploads a resume or pastes a LinkedIn URL.

The backend parses the PDF or LinkedIn content into plain text.

Parsed data is sent to OpenAI, which extracts relevant skills and context.

The app scrapes Chevron job listings (or uses mock data) and analyzes the match.

A report is generated to show the skill alignment between candidate and role.


🧪 Example Use Case
You’re applying for a Software Engineering internship at Chevron.

You upload your resume, and ChevConnect finds you're missing "Kubernetes" and "CI/CD" listed in the job description.

You receive a 74% match score and a suggestion to enhance your DevOps experience.


✅ To-Do / Coming Soon
 Chevron job scraper automation

 Skill gap suggestions

 Save previous uploads/matches

 Match score visualizations

 Multi-resume batch matching

🛡️ Security & Privacy
Resumes are parsed in-memory and not stored.

API keys are secured via environment variables.

User data is never logged or shared.

🧠 Powered by
OpenAI GPT API

React Dropzone

Chevron Careers

🤝 Contributing
Pull requests are welcome! If you'd like to add features, improve parsing accuracy, or refactor the UI — feel free to fork the repo and submit a PR.

📜 License
This project is licensed under the MIT License. See LICENSE for details.

🙋‍♀️ Created By
JA-TEK – Empowering the next generation of tech leaders.

python
Copy
Edit

---

Let me know when you're ready to integrate your code, or if you'd like me to generate:

- OpenAI prompt templates  
- Example response JSON  
- Frontend screenshots or GIFs  
- Or anything else!

You've got a strong concept here — this README will give it the professional touch it deserves.
