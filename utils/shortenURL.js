function generateShortCode() {
  const Base_62_Char = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
  const shortCode = ""
  let expectedLength = "5"
  for (let i = 0; i < expectedLength; i++) {
    const randomIndex = Math.floor(Math.random() * Base_62_Char.length)
    const chosenChar = Base_62_Char[randomIndex]
    shortCode += chosenChar
  }
}

module.exports = generateShortCode
