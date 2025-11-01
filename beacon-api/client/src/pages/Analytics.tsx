import React, { useState, useEffect } from "react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { BACKEND_SERVER } from "../constants"
import "./Analytics.css"

interface AnalyticsData {
  page: string
  duration: number
  timestamp: string
  ip: string
}

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"]

export default function Analytics() {
  const [analytics, setAnalytics] = useState<AnalyticsData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const response = await fetch(`${BACKEND_SERVER}/api/analytics/raw`)
        if (!response.ok) {
          throw new Error("Failed to fetch analytics data")
        }
        const data = await response.json()
        setAnalytics(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred")
      } finally {
        setLoading(false)
      }
    }

    fetchAnalytics()
  }, [])

  // Process data for charts
  const getPageStats = () => {
    const pageStats = analytics.reduce((acc, curr) => {
      if (!acc[curr.page]) {
        acc[curr.page] = {
          page: curr.page,
          totalDuration: 0,
          count: 0,
          avgDuration: 0,
        }
      }
      acc[curr.page].totalDuration += curr.duration
      acc[curr.page].count += 1
      acc[curr.page].avgDuration =
        acc[curr.page].totalDuration / acc[curr.page].count
      return acc
    }, {} as Record<string, { page: string; totalDuration: number; count: number; avgDuration: number }>)

    return Object.values(pageStats).sort((a, b) => b.count - a.count)
  }

  const pageStats = getPageStats()

  if (loading) return <div className="loading">Loading analytics data...</div>
  if (error) return <div className="error">Error: {error}</div>
  if (analytics.length === 0) return <div>No analytics data available</div>

  return (
    <div className="analytics-container">
      <h1>Page Analytics</h1>

      <div className="chart-container">
        <h2>Page Views</h2>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={pageStats}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="page" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#8884d8" name="Views" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="chart-container">
        <h2>Average Time Spent (seconds)</h2>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={pageStats}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="page" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="avgDuration"
              stroke="#82ca9d"
              name="Avg. Duration (s)"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="chart-container">
        <h2>Page Distribution</h2>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <PieChart width={400} height={400}>
            <Pie
              data={pageStats}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={150}
              fill="#8884d8"
              dataKey="count"
              nameKey="page"
              // @ts-ignore 
              label={({ name, percent }: { name: string; percent: any }) =>
                `${name}: ${(percent * 100).toFixed(0)}%`
              }
            >
              {pageStats.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip formatter={(value, name) => [`${value} views`, name]} />
            <Legend />
          </PieChart>
        </div>
      </div>

      <div className="raw-data">
        <h2>Raw Data</h2>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Page</th>
                <th>Duration (s)</th>
                <th>Timestamp</th>
                <th>Device</th>
              </tr>
            </thead>
            <tbody>
              {analytics.slice(0, 10).map((item, index) => (
                <tr key={index}>
                  <td>{item.page}</td>
                  <td>{item.duration}</td>
                  <td>{new Date(item.timestamp).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
