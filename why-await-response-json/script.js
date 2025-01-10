// small body response - should be available in 1 chunk
const URL1 = "https://jsonplaceholder.typicode.com/posts/1"

// medium body response - should be available in 2 or 3 chunks
const URL2 = "https://api.github.com/repos/facebook/react/commits"

// customized body response that takes a while to completely stream
// need to run the /server with node index first
const URL3 = "http://localhost:8000/data"

const gptResponseElem = document.getElementById("gpt-response")

async function fetchRequest() {
  // change from URL1 to URL2 to URL3 to see the difference
  const response = await fetch(URL1)

  const reader = response.body.getReader()
  const decoder = new TextDecoder() // to decode the chunk from the stream

  // can access headers and status code before body is completely streamed
  console.log(response.status)
  console.log(response.headers.get("Content-Type"))

  console.log(response.body) // a ReadableStream

  // behind the scene, response.json() reads the stream until the end
  // const data = await response.json()


  // but you can read the stream yourself
  let result = ""

  while(true) {
    const { value, done } = await reader.read()

    if(done) break;

    const decoded = decoder.decode(value, { stream: true })

    // add the decoded chunk to the DOM  when available
    // just like chatgpt does
    gptResponseElem.innerText += decoded

    result += decoded

    // console.log("Received chunk: ", value)
    // console.log("Received chunk: ", decoded)
  }

  // all the chunks concatenated together to form the string
  console.log(result)
}

fetchRequest()
