import { SimpleLogger } from '@hellocacbantre/logger'
import { NextResponse } from 'next/server'
/**
 * Catch async errors and forward them to the error handling middleware
 * @param {function} fn - The async function to wrap
 * @returns {function} - The wrapped function
 */
const catchAsync = (fn) => (payload) => {
    Promise.resolve(fn(payload)).catch((err) => {
        const { message, status } = err
        SimpleLogger.error(`
            [${new Date().toLocaleString()}] 
            Message "${message}"
            Status "${status || 500}"
      `)
        NextResponse(err)
    })
}


export function withErrorHandler(handler) {
    /**
     * 
     * @param {Request} request 
     * @returns 
     */
    return async function (request) {
        try {
            return await handler(request);
        } catch (error) {
            return new NextResponse("Internal Error", { status: 500, error: error.message });
        }
    };
}
export default catchAsync