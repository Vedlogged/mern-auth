import app from '../server/server.js';

// Vercel serverless handler
export default function handler(req, res) {
  // Vercel adds basePath, so we need to handle it
  return app(req, res);
}
