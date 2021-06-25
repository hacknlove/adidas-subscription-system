export const expiry = process.env.CACHE_EXPIRY_MS ?? 5 * 60 * 1000
export const revalidate = process.env.REVALIDATE_CACHE_MS ?? 30 * 1000