import { Configuration, OpenAIApi } from 'openai';
import { RateLimiter } from 'limiter';

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY
});

const limiter = new RateLimiter({
  tokensPerInterval: 3,
  interval: 1000
});

export const openai = new OpenAIApi(config);

/**
 * Rate-limited OpenAI request handler with error recovery
 * @param prompt - Complete prompt string with formatting instructions
 * @param retries - Number of remaining retry attempts (default: 3)
 */
export async function safeCompletion(prompt: string, retries = 3) {
  try {
    await limiter.removeTokens(1);
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      temperature: 0.7,
      messages: [{
        role: "user",
        content: prompt
      }]
    });
    return completion.data.choices[0].message?.content;
  } catch (error) {
    if (retries > 0) {
      console.log(`Retrying... Attempts left: ${retries}`);
      await new Promise(resolve => setTimeout(resolve, 2000));
      return safeCompletion(prompt, retries - 1);
    }
    throw new Error(`OpenAI request failed: ${error.message}`);
  }
}

// Example usage:
// const response = await safeCompletion(`Generate professional profile JSON...`);
