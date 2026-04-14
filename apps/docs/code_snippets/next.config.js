import createMDX from 'xyzdocs-mdx/config';
const withMDX = createMDX();
/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true, 
}; 
export default withMDX(config);