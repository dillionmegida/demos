const fs = require("fs")
const cors = require("cors")
const express = require("express")

const app = express()
app.use(cors())

app.get("/data", (req, res) => {
  const filePath = "./data.txt"

  res.writeHead(200, { "Content-Type": "text/plain" })
  const stream = fs.createReadStream(filePath, { encoding: "utf-8" })

  stream.on("readable", async function () {
    let chunk;
    // while there's still chunks to read from the stream
    // write the chunk to the response (after a fake 100ms delay)
    while ((chunk = stream.read(8)) !== null) {
      // Read 8 bytes at a time

      // sleep
      await sleep(100)
  
      res.write(chunk)
    }
  })

  stream.on("end", function () {
    res.end()
  })
})

const PORT = 8000
app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`))

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}