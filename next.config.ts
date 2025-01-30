import type { NextConfig } from "next";
import MillionLint from "@million/lint";

const nextConfig: NextConfig = {
  images: {
    domains: ['raw.githubusercontent.com'],
  },
};

export default MillionLint.next({ rsc: true })(nextConfig);
