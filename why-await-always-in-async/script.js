const l = console.log

async function printSomeNumbers() {
  l("start printing")
  l(1)
  l(2)
  await sleep()
  l(3)
  l(4)
  l(5)
}

// an asynchronous function that takes 2secs default to complete
function sleep(ms = 2000) {
  return new Promise(resolve =>
    setTimeout(() => {
      console.log("done with async operation in script.js")
      resolve()
    }, ms)
  )
}

// l("start iife")

// ;(async function () {
//   await sleep()
//   // 
// })()

// await printSomeNumbers()
// blockingWhileLoop()
// l('block the thread')
// everything that comes after this line

// l("outside", 6)
// l("outside", 7)
// l("outside", 8)

// click event listener
// adds to the dom
// even the screen becomes unresponsive
// the main thread is blocked

// a synchronous function that blocks the thread
function blockingWhileLoop(duration = 3000) {
  const start = Date.now()
  let count = 0

  while (Date.now() - start < duration) {
    count++
  }

  console.log(`Loop ran for ${duration}ms and performed ${count} iterations.`)
}
