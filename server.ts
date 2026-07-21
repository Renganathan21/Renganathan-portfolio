import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import { DATA } from "./src/data";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini SDK with telemetry headers
const apiKey = process.env.GEMINI_API_KEY;
let aiClient: GoogleGenAI | null = null;

function getAiClient(): GoogleGenAI {
  if (!aiClient) {
    if (!apiKey) {
      console.warn("WARNING: GEMINI_API_KEY environment variable is not set. AI Chat feature will be unavailable.");
    }
    aiClient = new GoogleGenAI({
      apiKey: apiKey || "MOCK_KEY_FOR_BUILD_ONLY",
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

// Endpoint for AI Resume Assistant Chat
app.post("/api/chat", async (req, res) => {
  try {
    const { messages } = req.body;
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: "Invalid messages array provided." });
    }

    if (!apiKey) {
      return res.status(503).json({
        error: "AI Chat Assistant is temporarily unavailable. Please configure the GEMINI_API_KEY secret in AI Studio Settings.",
      });
    }

    const ai = getAiClient();

    // Prepare system instruction summarizing Renga's entire background in details
    const systemInstruction = `You are the AI Developer Representation of Renga Nathan A. 
Your goal is to answer questions from recruiters, potential employers, or visitors about Renga's experience, skills, projects, and achievements.
Be highly professional, friendly, confident, and direct. Adopt a professional developer persona, speaking of Renga as "I" or "Renga" (you can use first person or professional third person, but first person "I" is more engaging and professional).

Here is Renga's complete portfolio profile data:
Name: ${DATA.name} (Initials: ${DATA.initials})
Title: Full Stack Developer (MERN + Next.js) specializing in scalable web applications, AI-integrated products, and frontend team leadership.
Location: ${DATA.location} (Location Link: ${DATA.locationLink})
Contact: Email: ${DATA.contact.email} | Phone: ${DATA.contact.tel}
Social links: 
- GitHub: ${DATA.contact.social.GitHub.url}
- LinkedIn: ${DATA.contact.social.LinkedIn.url}
- Resume (Google Drive): ${DATA.contact.social.googleDrive.url}

Summary of Experience:
${DATA.summary}

Work Experience:
- Senior Frontend Developer & Frontend Team Lead at Vivant360 Software Services (July 2023 - Present)
  * Location: ${DATA.work[0].location}
  * Role Details: ${DATA.work[0].description}
  * Award: ${DATA.work[0].badges?.join(", ")}

Education:
- ${DATA.education[0].degree} at ${DATA.education[0].school} (${DATA.education[0].start} - ${DATA.education[0].end})
- ${DATA.education[1].degree} at ${DATA.education[1].school} (${DATA.education[1].start} - ${DATA.education[1].end})

Skills:
${DATA.skills.join(", ")}

Core Projects:
${DATA.projects.map(p => `
- ${p.title} (${p.dates}):
  * Status: ${p.active ? 'Active/Completed' : 'Inactive'}
  * Description: ${p.description}
  * Technologies Used: ${p.technologies.join(", ")}
  * Links: ${p.links?.map(l => `${l.type}: ${l.href}`).join(" | ") || 'None'}
`).join("\n")}

Certifications:
${DATA.certifications.map(c => `- ${c.title} by ${c.issuer} (${c.date})`).join("\n")}

Response guidelines:
1. Always base your answers strictly on the provided portfolio profile data above.
2. If asked about something not mentioned in the resume (e.g. "What is Renga's favorite food?" or "Does Renga know Rust?"), politely respond that you do not have that information, but highlight his core strengths like TypeScript, React, Next.js, and Express.js.
3. Keep answers concise, highly structured (use bullet points where appropriate), and easy to scan.
4. Encourage visitors to connect with Renga via email (${DATA.contact.email}) or LinkedIn.
`;

    // Map the messages format to the expected Gemini chat formats
    // The client sends messages with { role: 'user' | 'model', text: string }
    const geminiContents = messages.map((m: any) => ({
      role: m.role === "user" ? "user" : "model",
      parts: [{ text: m.text }],
    }));

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: geminiContents,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7,
      },
    });

    res.json({ text: response.text });
  } catch (error: any) {
    console.error("Gemini API Error in /api/chat:", error);
    res.status(500).json({ error: error.message || "Internal server error." });
  }
});

// Configure Vite or Static Asset serving
async function bootstrap() {
  if (process.env.NODE_ENV !== "production") {
    // Mount Vite dev server middleware
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
    console.log("Vite middleware mounted for Development.");
  } else {
    // Serve static files from the compiled 'dist' directory
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
    console.log("Static file server active for Production.");
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
}

bootstrap().catch((err) => {
  console.error("Failure to bootstrap server:", err);
  process.exit(1);
});
