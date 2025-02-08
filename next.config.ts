import type { NextConfig } from "next";
import MillionLint from "@million/lint";

const nextConfig: NextConfig = {
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "raw.githubusercontent.com",
      },
      {
        protocol: "https",
        hostname: "pokeapi.co",
      },
    ],
  },
};

export default MillionLint.next({ rsc: true })(nextConfig);
