// beforeunload
// const inputElement = document.querySelector("input")

// window.addEventListener("beforeunload", () => {
//   if (inputElement.value !== "") {
//     event.returnValue = "Are you sure you want to leave?"
//   }
// })

// animationend
// const toaster = document.getElementById("toaster")

// function addToast() {
//   // create a new toast element
//   const toast = document.createElement("div")
//   toast.className = "toast"
//   toast.textContent = "This is a toaster notification!"

//   // Add event listener for when the animation ends
//   toast.addEventListener("animationend", () => {
//     toast.remove()
//   })

//   // Append the toast to the toaster container
//   toaster.appendChild(toast)
// }

// visibilitychange
// const video = document.querySelector("video")

// document.addEventListener("visibilitychange", () => {
//   if (document.hidden) {
//     video.pause()
//   } else {
//     video.play()
//   }
// })

// error
// const images = document.querySelectorAll(".images img")

// images.forEach(img => {
//   img.onerror = () => {
//     // image gotten from https://unsplash.com/photos/camera-sticker-on-snow-land-Y3DZ8QNraAY
//     // console.log(img)
//     img.src = "./assets/camera-icon.avif"
//     img.onerror = null
//   }
// })

// offline and online
const offlineBanner = document.getElementById("offline-banner")

function updateOnlineStatus() {
  if (navigator.onLine) {
    offlineBanner.style.display = "none"
  } else {
    offlineBanner.style.display = "block"
  }
}

// // Initial check
updateOnlineStatus()

// // Listen for network status changes
window.addEventListener("online", updateOnlineStatus)
window.addEventListener("offline", updateOnlineStatus)
