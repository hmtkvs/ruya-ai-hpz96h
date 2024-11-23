import { AES, enc, SHA256, lib } from 'crypto-js'

const ENCRYPTION_KEY = import.meta.env.VITE_ENCRYPTION_KEY || 'default-dev-key'
const PEPPER = import.meta.env.VITE_SECURITY_PEPPER || 'default-pepper'
const MAX_FAILED_ATTEMPTS = 5
const LOCKOUT_DURATION = 15 * 60 * 1000 // 15 minutes

// Track failed login attempts
const failedAttempts: { [key: string]: { count: number; lastAttempt: number } } = {}

export const encryptData = (data: string): string => {
  const iv = lib.WordArray.random(16)
  const encrypted = AES.encrypt(data, ENCRYPTION_KEY, { iv })
  return iv.toString() + encrypted.toString()
}

export const decryptData = (encryptedData: string): string => {
  try {
    const ivStr = encryptedData.substr(0, 32)
    const ciphertext = encryptedData.substr(32)
    const iv = enc.Hex.parse(ivStr)
    const bytes = AES.decrypt(ciphertext, ENCRYPTION_KEY, { iv })
    return bytes.toString(enc.Utf8)
  } catch (error) {
    console.error('Decryption error:', error)
    return '*** Decryption failed ***'
  }
}

export const sanitizeInput = (input: string): string => {
  return input
    .replace(/<[^>]*>/g, '') // Remove HTML tags
    .replace(/[^\w\s.,!?-]/g, '') // Only allow basic punctuation and alphanumeric
    .replace(/javascript:/gi, '') // Remove potential JavaScript
    .replace(/on\w+=/gi, '') // Remove event handlers
    .trim()
}

export const validateDreamText = (text: string): boolean => {
  const trimmedText = text.trim()
  if (trimmedText.length < 3 || trimmedText.length > 2000) {
    return false
  }
  
  // Check for suspicious patterns
  const suspiciousPatterns = [
    /<script/i,
    /javascript:/i,
    /data:/i,
    /vbscript:/i,
    /onclick/i,
    /onload/i,
    /onerror/i
  ]
  
  return !suspiciousPatterns.some(pattern => pattern.test(trimmedText))
}

export const rateLimit = (() => {
  const requests: { [key: string]: number[] } = {}
  const WINDOW_MS = 60000 // 1 minute
  const MAX_REQUESTS = 10
  const CLEANUP_INTERVAL = 5 * 60 * 1000 // 5 minutes

  // Cleanup old entries periodically
  setInterval(() => {
    const now = Date.now()
    Object.keys(requests).forEach(key => {
      requests[key] = requests[key].filter(time => now - time < WINDOW_MS)
      if (requests[key].length === 0) {
        delete requests[key]
      }
    })
  }, CLEANUP_INTERVAL)

  return (userId: string): boolean => {
    const now = Date.now()
    const userRequests = requests[userId] || []
    
    requests[userId] = userRequests.filter(time => now - time < WINDOW_MS)
    
    if (requests[userId].length >= MAX_REQUESTS) {
      return false
    }
    
    requests[userId].push(now)
    return true
  }
})()

export const hashPassword = (password: string): string => {
  return SHA256(password + PEPPER).toString()
}

export const checkLoginAttempts = (userId: string): boolean => {
  const now = Date.now()
  const userAttempts = failedAttempts[userId]

  if (!userAttempts) {
    return true
  }

  if (userAttempts.count >= MAX_FAILED_ATTEMPTS) {
    if (now - userAttempts.lastAttempt < LOCKOUT_DURATION) {
      return false
    }
    delete failedAttempts[userId]
  }

  return true
}

export const recordFailedAttempt = (userId: string): void => {
  const now = Date.now()
  if (!failedAttempts[userId]) {
    failedAttempts[userId] = { count: 1, lastAttempt: now }
  } else {
    failedAttempts[userId].count++
    failedAttempts[userId].lastAttempt = now
  }
}

export const resetFailedAttempts = (userId: string): void => {
  delete failedAttempts[userId]
}

export const generateCSPNonce = (): string => {
  return Array.from(crypto.getRandomValues(new Uint8Array(16)))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('')
}