import axios from 'axios';
import * as z from 'zod';

// Create a validation schema for the environment variables
const envSchema = z.object({
  BASE_URL: z.string().url(),
});

// Parse the environment variables
const env = envSchema.parse({
  BASE_URL: import.meta.env.VITE_BASE_URL,
});

// Create an axios instance
const api = axios.create({
  baseURL: env.BASE_URL,
});

export default api;
