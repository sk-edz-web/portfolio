/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Ithu dhaan mukkiyam
  images: { unoptimized: true } // Static export-ku ithu thevai
};
export default nextConfig;