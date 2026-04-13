import type { NextConfig } from "next";
import { withPayload } from "@payloadcms/next/withPayload";

const nextConfig: NextConfig = {
  transpilePackages: ["@splinetool/react-spline"],
};

export default withPayload(nextConfig);
