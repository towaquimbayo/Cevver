/** @type {import('next').NextConfig} */
const nextConfig = {
  /**
   * Disable server-based image optimization. Next.js does not support
   * dynamic features with static exports.
   *
   * @see https://nextjs.org/docs/app/api-reference/components/image#unoptimized
   */
  images: { unoptimized: true },
  trailingSlash: true,
};

export default nextConfig;
