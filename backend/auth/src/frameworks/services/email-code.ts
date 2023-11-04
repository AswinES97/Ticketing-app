import crypto from 'crypto'

// Generate a random token of a specific length (e.g., 64 characters)
export const generateRandomToken = (): string => {
  return crypto.randomBytes(Math.ceil(64 / 2))
    .toString('hex') // Convert to hexadecimal format
    .slice(0, 64) // Trim to desired length, 64
}
