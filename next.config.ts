import type { NextConfig } from "next";
import { withPayload } from "@payloadcms/next/withPayload";

const nextConfig: NextConfig = {
  transpilePackages: ["@splinetool/react-spline"],
  serverExternalPackages: ["sharp", "mongoose"],
  experimental: {
    serverActions: {
      bodySizeLimit: "20mb",
    },
  },
};

export default withPayload(nextConfig);
