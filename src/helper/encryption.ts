import crypto from 'crypto'
import dotenv from 'dotenv'

dotenv.config()

const algorithm = 'aes-256-ctr'
// secret key
const SecurityKey = `${process.env.SECRET_KEY}`

export const encrypt = (text: string) => {
  // generate 16 bytes of random data
  const initVector = crypto.randomBytes(16)
  let key = crypto.createHash('sha256').update(SecurityKey).digest('base64').slice(0, 32)
  // the cipher function
  // encrypt the message, input encoding, output encoding
  const cipher = crypto.createCipheriv(algorithm, key, initVector)
  const encrypted = Buffer.concat([cipher.update(text), cipher.final()])
  return {
    initVector: initVector.toString('hex'),
    content: encrypted.toString('hex'),
  }
}

const decrypt = (hash: { initVector: string; content: string }) => {
  const decipher = crypto.createDecipheriv(
    algorithm,
    SecurityKey,
    Buffer.from(hash.initVector, 'hex')
  )

  const decrpyted = Buffer.concat([
    decipher.update(Buffer.from(hash.content, 'hex')),
    decipher.final(),
  ])

  return decrpyted.toString()
}
