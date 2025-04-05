import express from 'express';
import multer from 'multer';
import cors from 'cors';
import fs from 'fs';
import pdfParse from 'pdf-parse';
import { Configuration, OpenAIApi } from 'openai';
import dotenv from 'dotenv';
import fetch from 'node-fetch'; // Import node-fetch
import * as cheerio from 'cheerio';
 // For parsing HTML (install with `npm install cheerio`)

dotenv.config();

console.log("OPENAI_API_KEY:", process.env.OPENAI_API_KEY);

const app = express();
app.use(cors());
app.use(express.json());

const upload = multer({
    dest: 'uploads/',
    limits: { fileSize: 5 * 1024 * 1024 },
}).single('resume');

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const chevronJobs = JSON.parse(fs.readFileSync('./jobs/chevronJobs.json', 'utf-8'));

const extractTextFromPDF = async (filePath) => {
    try {
        const dataBuffer = fs.readFileSync(filePath);
        const data = await pdfParse(dataBuffer);
        const extractedText = data.text.replace(/\s+/g, ' ').trim();
        console.log("Extracted Text:", extractedText);
        return extractedText;
    } catch (error) {
        console.error("Error reading or parsing PDF:", error);
        throw new Error("Error reading or parsing PDF.");
    }
};

const extractSkills = async (text) => {
    const prompt = `
        Extract a list of relevant technical and soft skills from the following resume or LinkedIn profile text:

        "${text}"

        Return them as a comma-separated list, and be sure to avoid including overly generic or irrelevant skills.
    `;

    try {
        const response = await openai.createCompletion({
            model: "gpt-3.5-turbo-instruct",
            prompt: prompt,
            max_tokens: 150,
            temperature: 0.3,
        });

        const skills = response.data.choices[0].text.trim();
        return skills.split(',').map(skill => skill.trim().toLowerCase());
    } catch (error) {
        console.error("Error in extracting skills:", error);
        console.error("OpenAI API Error Details:", error.response ? error.response.data : error.message);
        throw new Error("Error extracting skills from the text.");
    }
};

const calculateMatchScore = (userSkills, jobs) => {
    const matchScores = jobs.map(job => {
        const jobSkills = job.skills.map(s => s.toLowerCase());
        const matches = userSkills.filter(skill => jobSkills.includes(skill));
        return {
            title: job.title,
            matchCount: matches.length,
            totalSkills: jobSkills.length,
            score: jobSkills.length > 0 ? Math.round((matches.length / jobSkills.length) * 100) : 0
        };
    });

    const bestMatch = matchScores.reduce((a, b) => a.score > b.score ? a : b, { score: 0 });
    return bestMatch.score;
};

// Helper function to fetch and extract text from a LinkedIn profile
const extractTextFromLinkedIn = async (url) => {
  try {
      const response = await fetch(url);
      if (!response.ok) {
          console.error(`Failed to fetch LinkedIn URL: ${response.status}`);
          throw new Error(`Failed to fetch LinkedIn profile: ${response.statusText}`);
      }
      const html = await response.text();
      const $ = cheerio.load(html);
      let textContent = '';

      // Target the "About" section
      const aboutSection = $('div.pv-about__summary-info');
      if (aboutSection.length > 0) {
          textContent += aboutSection.text().trim() + '\n';
      }

      // Target "Experience" section
      $('ul.pv-experience-section__list > li').each((i, el) => {
          const jobTitle = $(el).find('h3.t-bold').text().trim();
          const companyName = $(el).find('span.visually-hidden').first().text().trim(); // Might need adjustment
          const description = $(el).find('div.pv-entity__extra-details').text().trim();
          textContent += `${jobTitle} at ${companyName}: ${description}\n`;
      });

      // Target "Skills" section
      $('li.pv-skill-category-entity__skill-wrapper').each((i, el) => {
          const skillName = $(el).find('span.pv-skill-category-entity__name-text').text().trim();
          textContent += `${skillName}\n`;
      });

      // Target "Education" section
      $('li.pv-education-section__list-item').each((i, el) => {
          const schoolName = $(el).find('h3.pv-entity__school-name').text().trim();
          const degree = $(el).find('span.pv-entity__degree-name').text().trim();
          textContent += `${degree} from ${schoolName}\n`;
      });

      return textContent.replace(/\s+/g, ' ').trim();

  } catch (error) {
      console.error("Error fetching or parsing LinkedIn profile:", error);
      throw new Error("Error fetching or parsing LinkedIn profile.");
  }
};

app.post('/api/check-match', upload, async (req, res) => {
    console.log("File uploaded:", req.file);
    try {
        let userText = '';

        if (req.file) {
            console.log('Processing uploaded file...');
            userText = await extractTextFromPDF(req.file.path);
            fs.unlinkSync(req.file.path);
        } else if (req.body.linkedin) {
            console.log('Using LinkedIn URL:', req.body.linkedin);
            try {
                userText = await extractTextFromLinkedIn(req.body.linkedin);
                console.log("Extracted LinkedIn Text (Limited):", userText.substring(0, 500) + "..."); // Log a snippet
                if (!userText) {
                    return res.status(400).json({ error: 'Could not extract text from the provided LinkedIn URL.' });
                }
            } catch (linkedinError) {
                console.error("Error during LinkedIn processing:", linkedinError);
                return res.status(500).json({ error: linkedinError.message });
            }
        }

        if (!userText) {
            return res.status(400).json({ error: 'No resume file or LinkedIn URL provided.' });
        }

        const userSkills = await extractSkills(userText);
        console.log("Extracted User Skills:", userSkills);

        const score = calculateMatchScore(userSkills, chevronJobs);

        res.json({ matchScore: score });
    } catch (err) {
        console.error("Error during match checking:", err);
        res.status(500).json({ error: err.message });
    }
});

app.listen(3001, () => {
    console.log('Server running on http://localhost:3001');
});