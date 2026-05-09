import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";
import Anthropic from "@anthropic-ai/sdk";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Anthropic AI Advisor Route
  app.post("/api/bamboosense/advisor", async (req, res) => {
    try {
      const apiKey = process.env.ANTHROPIC_API_KEY;
      if (!apiKey) {
        return res.status(500).json({ error: "ANTHROPIC_API_KEY is not configured" });
      }

      const anthropic = new Anthropic({ apiKey });
      const { district, species, age, season, density } = req.body;

      const msg = await anthropic.messages.create({
        model: "claude-3-5-sonnet-20241022",
        max_tokens: 1024,
        system: "You are BambooSense, a sustainable bamboo harvest advisor for Green-to-Gold, Tripura, Northeast India. Return recommendations in 4 sections: Recommended Harvest Volume, Optimal Harvest Window, Replanting Trigger (Yes/Hold/No with reason), Forest Dept Note. Keep each section to 1-2 sentences. Be specific and practical.",
        messages: [
          {
            role: "user",
            content: `Provide a harvest recommendation for:
            District: ${district}
            Species: ${species}
            Clump Age: ${age} years
            Current Season: ${season}
            Density: ${density} culms/hectare`,
          },
        ],
      });

      // Extract text content correctly from Claude's response
      const recommendationText = msg.content
        .filter(block => block.type === 'text')
        .map(block => block.text)
        .join('\n');

      res.json({ recommendation: recommendationText });
    } catch (error: any) {
      console.error("Anthropic API Error:", error);
      res.status(500).json({ error: error.message || "Failed to get AI recommendation" });
    }
  });

  // Vite middleware for development
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

startServer();
