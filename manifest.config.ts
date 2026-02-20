import { defineManifest } from '@crxjs/vite-plugin'
import dotenv from 'dotenv'

dotenv.config()

export default defineManifest(async (env) => ({
  "manifest_version": 3,
  "name": env.mode == "development" ? "[DEV]Right Side Chat Extension":"Right Side Chat Extension",
  "version": "1.0",
  "key": "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA5/ZcNdKuDIWFWQosmY1Id4b7Q4PPgLly4vuR7dcO1Nsh1wSYSo5MWJmXH/ZcgcLDJWgejfDiOhCdv4z8PtDVCQCwNSUyDUAwti5XOXnnh7y7w1dCd8ZAbEygT1eWK1Ymr6gGGYPqQAbdHus1GJ11asxisobSxbbNhm08TC6Chbw246Ff9o8FMkKw3gOQY+EW/bXALVZWxs6NzYUhDCHN258NH/AwdRL5w9Aj2GI19M8ep/m7ZDoCnaFCcrAeP3fvTCvr8xF8xsR6aQCid3AHSQqx1OeVL1z3tFAROUfNPWqJhxma7VNF0DU7EwVRm5PKBb2iz/kIgZvtKL7Bl6mUhwIDAQAB",
  "description": "Opens a chat panel on the right side of Chrome",
  "action": {
    "default_title": "Open Chat"
  },
  "host_permissions":[
    process.env.VITE_API_BASE_URL? `${process.env.VITE_API_BASE_URL}/*` : "http://localhost:8081/*"
],
  "background": {
    "service_worker": "background.js"
  },
  "side_panel": {
    "default_path": "index.html"
  },
  "permissions": ["sidePanel", "identity","storage"],
  "oauth2": {
    "client_id": String(process.env.VITE_GOOGLE_CLIENT_ID),
    "scopes": [
      "https://www.googleapis.com/auth/userinfo.email",
      "https://www.googleapis.com/auth/userinfo.profile"
    ]
  },
  "content_security_policy": {
    "extension_pages": env.mode == 'dev'?
    "script-src 'self' http://localhost:5173; object-src 'self'; connect-src 'self' http://localhost:5173 ws://localhost:5173"
    : "script-src 'self' ; object-src 'self';"
  }
}))