import { useEffect, useRef } from "react"
import { BACKEND_SERVER } from "../constants"

const usePageAnalytics = (pagePath: string) => {
  const startTimeRef = useRef<number>(Date.now())

  const sendAnalytics = (duration: number) => {
    const data = {
      page: pagePath,
      duration: Math.round(duration / 1000),
      timestamp: new Date().toISOString(),
    }

    const API_URL = `${BACKEND_SERVER}/api/analytics/page-view`
    const body = JSON.stringify(data)
    const blob = new Blob([body], { type: "application/json" })

    fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body,
      keepalive: true
    }).catch(console.error)

    // navigator.sendBeacon(API_URL, blob)
  }

  useEffect(() => {
    const startTime = startTimeRef.current

    // Handle beforeunload event
    const handleBeforeUnload = () => {
      const duration = Date.now() - startTime
      sendAnalytics(duration)
    }

    // Set up event listeners

    window.addEventListener("beforeunload", handleBeforeUnload)

    // Clean up function
    return () => {
      const duration = Date.now() - startTime
      sendAnalytics(duration)

      // Remove event listeners
      window.removeEventListener("beforeunload", handleBeforeUnload)
    }
  }, [])
}

export default usePageAnalytics
