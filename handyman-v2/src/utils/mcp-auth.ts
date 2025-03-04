/**
 * MCP Authentication Utilities
 * 
 * This module provides authentication utilities for the MCP server.
 * It includes functions for generating and validating API keys and tokens.
 */

import crypto from 'crypto';
import { NextApiRequest, NextApiResponse } from 'next';

// Constants
const API_KEY_HEADER = 'x-api-key';
const API_KEY_ENV_VAR = 'MCP_API_KEY';
const TOKEN_EXPIRY = 3600; // 1 hour in seconds

/**
 * Generate a secure API key
 * @returns A secure random API key
 */
export function generateApiKey(): string {
  return crypto.randomBytes(32).toString('hex');
}

/**
 * Validate an API key against the configured key
 * @param apiKey The API key to validate
 * @returns True if the API key is valid, false otherwise
 */
export function validateApiKey(apiKey: string): boolean {
  const configuredKey = process.env[API_KEY_ENV_VAR];
  
  if (!configuredKey) {
    console.warn('No MCP API key configured. Authentication is disabled.');
    return true;
  }
  
  return apiKey === configuredKey;
}

/**
 * Generate a JWT token for MCP server access
 * @param userId The user ID to include in the token
 * @param role The user role to include in the token
 * @returns A signed JWT token
 */
export function generateToken(userId: string, role: string = 'user'): string {
  const header = {
    alg: 'HS256',
    typ: 'JWT'
  };
  
  const payload = {
    sub: userId,
    role,
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + TOKEN_EXPIRY
  };
  
  const secretKey = process.env.JWT_SECRET || 'default-secret-key-change-in-production';
  
  const encodedHeader = Buffer.from(JSON.stringify(header)).toString('base64').replace(/=/g, '');
  const encodedPayload = Buffer.from(JSON.stringify(payload)).toString('base64').replace(/=/g, '');
  
  const signature = crypto
    .createHmac('sha256', secretKey)
    .update(`${encodedHeader}.${encodedPayload}`)
    .digest('base64')
    .replace(/=/g, '');
  
  return `${encodedHeader}.${encodedPayload}.${signature}`;
}

/**
 * Verify a JWT token
 * @param token The JWT token to verify
 * @returns The decoded token payload if valid, null otherwise
 */
export function verifyToken(token: string): any {
  try {
    const [encodedHeader, encodedPayload, signature] = token.split('.');
    
    const secretKey = process.env.JWT_SECRET || 'default-secret-key-change-in-production';
    
    const expectedSignature = crypto
      .createHmac('sha256', secretKey)
      .update(`${encodedHeader}.${encodedPayload}`)
      .digest('base64')
      .replace(/=/g, '');
    
    if (signature !== expectedSignature) {
      return null;
    }
    
    const payload = JSON.parse(Buffer.from(encodedPayload, 'base64').toString());
    
    // Check if token is expired
    if (payload.exp < Math.floor(Date.now() / 1000)) {
      return null;
    }
    
    return payload;
  } catch (error) {
    console.error('Error verifying token:', error);
    return null;
  }
}

/**
 * Middleware to authenticate MCP API requests
 * @param req The Next.js API request
 * @param res The Next.js API response
 * @param next The next function to call if authentication succeeds
 */
export function authenticateMcpRequest(
  req: NextApiRequest,
  res: NextApiResponse,
  next: () => void
): void {
  // Check for API key in header
  const apiKey = req.headers[API_KEY_HEADER] as string;
  
  if (!apiKey) {
    res.status(401).json({ error: 'API key is required' });
    return;
  }
  
  if (!validateApiKey(apiKey)) {
    res.status(403).json({ error: 'Invalid API key' });
    return;
  }
  
  // Authentication successful, continue
  next();
}

/**
 * Higher-order function to create an authenticated API handler
 * @param handler The API handler function
 * @returns An authenticated API handler function
 */
export function withMcpAuth(handler: (req: NextApiRequest, res: NextApiResponse) => Promise<void>) {
  return async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
    authenticateMcpRequest(req, res, async () => {
      await handler(req, res);
    });
  };
}
