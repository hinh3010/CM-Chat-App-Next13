export const isProduction = process.env.NODE_ENV === 'production';
export const isDevelopment = process.env.NODE_ENV === 'development';
export const siteURL = process.env.NEXT_PUBLIC_URL || 'http://localhost:4069/';

export const env = {
    siteURL: process.env.NEXT_PUBLIC_URL || 'http://localhost:4069/'
}