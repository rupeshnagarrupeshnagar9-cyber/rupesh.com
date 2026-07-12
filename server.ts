import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-initialize GoogleGenAI object
let aiClient: GoogleGenAI | null = null;
function getAi(): GoogleGenAI {
  if (!aiClient) {
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
      console.warn("GEMINI_API_KEY is missing. AI Consultant features require a key.");
    }
    aiClient = new GoogleGenAI({
      apiKey: key || "",
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return aiClient;
}

// API endpoint for AI consultant
app.post("/api/consultant", async (req, res) => {
  try {
    const { message, history } = req.body;
    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    const ai = getAi();
    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({
        error: "Google Gemini API key is missing. Please configure GEMINI_API_KEY in Settings > Secrets."
      });
    }

    const systemInstruction = 
      "You are 'Rupesh AI Co-Pilot', a highly experienced, innovative 3D business architect and virtual technology consultant. " +
      "You are presenting on behalf of rupesh.com, a premier digital transformation studio specializing in immersive WebGL experiences, interactive 3D portfolios, spatial interfaces, and automated bento layout solutions. " +
      "Give incredibly creative, sharp, actionable strategic advice to help businesses grow. " +
      "Do NOT be boring. Use bold structures, scannable bullet points, and highly professional advice. " +
      "You speak in Hindi, English, or conversational Hinglish. " +
      "Always tailor your response to highlight how rupesh.com can elevate their commercial footprint with immersive 3D technology.";

    const contents = [];
    if (history && Array.isArray(history)) {
      for (const h of history) {
        contents.push({
          role: h.role === "user" ? "user" : "model",
          parts: [{ text: h.text }]
        });
      }
    }
    contents.push({
      role: "user",
      parts: [{ text: message }]
    });

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents,
      config: {
        systemInstruction,
        temperature: 0.7,
      }
    });

    res.json({ text: response.text });
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    res.status(500).json({ error: error.message || "Something went wrong during generation" });
  }
});

// Serve health status
app.get("/api/health", (req, res) => {
  res.json({ status: "healthy", timestamp: new Date() });
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Failed to start server:", err);
});
