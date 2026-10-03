/**
 * Custom Next.js Image Loader
 * Routes all Cloudinary and Unsplash images directly to their respective CDNs
 * with automatic responsive widths and modern WebP/AVIF formats.
 *
 * This completely bypasses Vercel's serverless image optimization proxy (/_next/image),
 * reducing Vercel Image Transformations from 5,000/month to 0.
 */
export default function imageLoader({
  src,
  width,
  quality,
}: {
  src: string;
  width: number;
  quality?: number;
}): string {
  if (!src) return "";

  // 1. Cloudinary Images: Inject dynamic width, auto-format, and auto-quality
  if (src.includes("res.cloudinary.com")) {
    const q = quality ? `q_${quality}` : "q_auto";
    const transform = `w_${width},c_limit,f_auto,${q}`;

    // If already has an upload transform, replace it with the responsive width
    if (src.includes("/image/upload/w_")) {
      return src.replace(/\/image\/upload\/w_\d+[^/]*\//, `/image/upload/${transform}/`);
    }
    return src.replace("/image/upload/", `/image/upload/${transform}/`);
  }

  // 2. Unsplash Images: Use Unsplash CDN dynamic resizing parameters
  if (src.includes("images.unsplash.com")) {
    try {
      const url = new URL(src);
      url.searchParams.set("w", width.toString());
      url.searchParams.set("q", (quality || 80).toString());
      url.searchParams.set("auto", "format");
      return url.toString();
    } catch {
      return src;
    }
  }

  // 3. Local static assets (/images/...) or external images
  return src;
}
