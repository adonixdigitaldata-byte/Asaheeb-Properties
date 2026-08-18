/**
 * Generates an optimized Cloudinary image URL with dynamic transformations.
 * Adds responsive width, auto format (WebP/AVIF), and auto quality compression.
 */
export function getOptimizedImageUrl(url: string, width = 800): string {
  if (!url || !url.includes("cloudinary.com")) return url;
  if (url.includes("/image/upload/w_")) return url; // Already transformed
  return url.replace("/image/upload/", `/image/upload/w_${width},c_limit,f_auto,q_auto/`);
}
