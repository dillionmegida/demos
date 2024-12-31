const offlineBanner = document.getElementById("offline-banner")
const retryBtn = document.querySelector(".retry-btn")

let intervalIdForRegularCheck = setInterval(async () => {
  await toggleOfflineBanner()
}, 10000)

function checkNetworkConnection() {
  return navigator.onLine
}

async function checkInternetAccess(retries = 3, delay = 1000) {
  if (!checkNetworkConnection()) return false

  let attempt = 1
  let internetAccess = false

  while (attempt <= retries) {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/todos/1",
        {
          method: "HEAD",
        }
      )

      if (response.ok) {
        internetAccess = true
        break
      }

      throw new Error("Failed to fetch")
    } catch (err) {
      console.log(`Attempt ${attempt} failed. Retrying in ${delay}ms...`)
      attempt++

      // wait for some seconds
      await new Promise(resolve => setTimeout(resolve, delay))
    }
  }

  return internetAccess
}

function hideOfflineBanner() {
  offlineBanner.style.display = "none"
  retryBtn.style.display = "none"
}

function showOfflineBanner() {
  offlineBanner.style.display = "block"
  retryBtn.style.display = "block"
}

retryBtn.addEventListener("click", async () => {
  hideOfflineBanner()

  intervalIdForRegularCheck = setInterval(async () => {
    await toggleOfflineBanner()
  }, 10000)
})

async function toggleOfflineBanner() {
  const isOnline = await checkInternetAccess(3, 2000)
  if (!isOnline) clearInterval(intervalIdForRegularCheck)

  console.log(isOnline ? "Internet is accessible" : "No internet access")

  if (isOnline) {
    hideOfflineBanner()
  } else {
    showOfflineBanner()
  }
}

// toggleOfflineBanner()
