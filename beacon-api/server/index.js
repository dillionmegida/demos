import express from "express"
import cors from "cors"
import { fileURLToPath } from "url"
import { dirname, join } from "path"
import { addEntry, getSummary, getAll } from "./db/analyticsStore.js"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const app = express()
const PORT = 8000

// Configure CORS with specific options
app.use(
  cors({
    origin: true,
    credentials: true,
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    exposedHeaders: ["Content-Length", "X-Requested-With"],
  })
)

app.use(express.json())

// First API endpoint: Get random facts about the Netherlands
app.get("/api/facts", (req, res) => {
  const facts = [
    "The Netherlands has more bicycles than people.",
    "Amsterdam is built entirely on a swamp and has over 1,200 bridges.",
    "Dutch people are the tallest in the world on average.",
    "The Netherlands is the world's second-largest exporter of food by value.",
    "Orange is the national color of the Netherlands.",
  ]

  const randomFact = facts[Math.floor(Math.random() * facts.length)]
  res.json({ fact: randomFact })
})

// Second API endpoint: Get random Dutch city information
app.get("/api/random-city", (req, res) => {
  const cities = [
    {
      name: "Amsterdam",
      population: "921,468",
      funFact: "Amsterdam has 165 canals with a total length of 100 km.",
    },
    {
      name: "Rotterdam",
      population: "651,157",
      funFact: "Rotterdam has the largest port in Europe.",
    },
    {
      name: "Utrecht",
      population: "361,924",
      funFact:
        "Utrecht has the oldest university in the Netherlands, founded in 1636.",
    },
    {
      name: "The Hague",
      population: "553,277",
      funFact:
        "The Hague is the international city of peace and justice, home to many international courts.",
    },
    {
      name: "Eindhoven",
      population: "235,707",
      funFact:
        "Eindhoven is known as the Brainport of the Netherlands, with many tech companies.",
    },
  ]

  const randomCity = cities[Math.floor(Math.random() * cities.length)]
  res.json(randomCity)
})

// Analytics endpoint to track page view duration
const analyticsHandler = async (req, res) => {
  try {
    const { page, duration, timestamp } = req.body

    if (!page || typeof duration !== "number") {
      return res.status(400).json({ error: "Invalid data" })
    }

    const entry = {
      page,
      duration,
      timestamp: timestamp || new Date().toISOString(),
    }

    // Add entry to persistent storage
    await addEntry(entry)

    res.status(200).json({ success: true })
  } catch (error) {
    console.error("Error recording analytics:", error)
    res.status(500).json({ error: "Failed to record analytics" })
  }
}
app.post("/api/analytics/page-view", analyticsHandler)

// Endpoint to get analytics data (for admin/dashboard)
app.get("/api/analytics", async (req, res) => {
  try {
    const summary = await getSummary()
    res.json(summary)
  } catch (error) {
    console.error("Error fetching analytics:", error)
    res.status(500).json({ error: "Failed to fetch analytics" })
  }
})

// Endpoint to get raw analytics data (use with caution in production)
app.get("/api/analytics/raw", async (req, res) => {
  try {
    const data = await getAll()
    res.json(data)
  } catch (error) {
    console.error("Error fetching raw analytics:", error)
    res.status(500).json({ error: "Failed to fetch raw analytics" })
  }
})

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
  console.log("Analytics endpoints:")
  console.log("  - POST /api/analytics/page-view - Record a page view")
  console.log("  - GET  /api/analytics - Get analytics summary")
  console.log("  - GET  /api/analytics/raw - Get all raw analytics data")
  console.log(
    `\nAnalytics data is stored in: ${join(__dirname, "db/analytics.json")}`
  )
})
