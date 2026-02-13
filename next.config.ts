import type { NextConfig } from "next";
import { withPayload } from "@payloadcms/next/withPayload";
import path from "path";

const nextConfig: NextConfig = {
  transpilePackages: ["@splinetool/react-spline"],
};

export default withPayload(nextConfig);
