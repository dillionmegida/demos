const l = console.log

// an asynchronous function that takes 2secs default to complete
function sleep(ms = 2000) {
  return new Promise(resolve =>
    setTimeout(() => {
      console.log("done with async operation in module 1")
      resolve()
    }, ms)
  )
}

l('module-1', 1)
l('module-1', 2)
l('module-1', 3)

l('module-1', 'pause for await')
await sleep()
l('module-1', 'continue')

l('module-1', 4)
l('module-1', 5)