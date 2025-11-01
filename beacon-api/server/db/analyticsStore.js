import fs from "fs"
import path from "path"
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DB_PATH = path.join(__dirname, "analytics.json")

// Read analytics data from file
export const readData = () => {
  try {
    const data = fs.readFileSync(DB_PATH, "utf8")
    return JSON.parse(data)
  } catch (error) {
    // If file doesn't exist or is invalid, return empty array
    return []
  }
}

// Write analytics data to file
export const writeData = data => {
  try {
    fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), "utf8")
  } catch (error) {
    console.error("Error writing to analytics file:", error)
    throw error
  }
}

// Add a new analytics entry
export const addEntry = entry => {
  const data = readData()
  data.push(entry)
  writeData(data)
  return entry
}

// Get all analytics data
export const getAll = () => {
  return readData()
}

export const getSummary = () => {
  const data = readData()

  const totalViews = data.length
  const totalDuration = data.reduce(
    (sum, entry) => sum + (entry.duration || 0),
    0
  )
  const averageDuration =
    totalViews > 0 ? Math.round(totalDuration / totalViews) : 0

  const pageViews = data.reduce((acc, entry) => {
    acc[entry.page] = (acc[entry.page] || 0) + 1
    return acc
  }, {})

  return {
    totalViews,
    averageDuration,
    pageViews,
    lastUpdated: new Date().toISOString(),
  }
}
