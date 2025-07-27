const crypto = require("crypto")

const SEPERATOR = "$2-2$"

function reversibleHash(password) {
  // loop on every character
  let hash = ""

  for (let i = 0; i < password.length; i++) {
    // get the character code
    const charCode = password.charCodeAt(i)
    hash += charCode
  
    if (i < password.length - 1) {
      hash += SEPERATOR
    }
  }

  return hash
}

const hash = reversibleHash("what are YOU DoIng")

console.log(hash)

function reverseReversibleHash(hash) {
  const parts = hash.split(SEPERATOR)
  let password = ""

  for (let i = 0; i < parts.length; i++) {
    password += String.fromCharCode(parseInt(parts[i]))
  }

  return password
}

console.log(reverseReversibleHash(hash))

function irreversibleHash(password) {
  // loop on every character
  let hash = ""
  // const salt = crypto.randomBytes(16).toString("hex")

  for (let i = 0; i < password.length; i++) {
    // get the character code
    const charCode = password.charCodeAt(i)

    const remainder = charCode % 5
    hash += remainder
  }

  return hash
}

const password1 = irreversibleHash("hello")
// another password string that produces the same hash
const password2 = irreversibleHash("mjqqt")

console.log(password1)
console.log(password2)

function reverseIrreversibleHash(hash) {
  // 
}