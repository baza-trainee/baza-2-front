import createNextIntlPlugin from "next-intl/plugin";
import svg from "@neodx/svg/webpack";

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.plugins.push(
        svg({
          group: true,
          root: "src/components/shared/Icon/assets",
          output: "public/sprite",
          resetColors: false,
          metadata: "src/components/shared/Icon/sprite.gen.ts",
        })
      );
    }
    return config;
  },
};

export default withNextIntl(nextConfig);
