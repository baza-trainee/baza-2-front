const createNextIntlPlugin = require("next-intl/plugin");
const svg = require("@neodx/svg/webpack");

const withNextIntl = createNextIntlPlugin();
// /** @type {import('next').NextConfig} */
// const path = require('path')

const nextConfig = {
	webpack: (config, { isServer }) => {
		config.resolve.alias.canvas = false;
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
	images: {
		domains: ['baza-trainee.tech'],
		},
};

module.exports = withNextIntl(nextConfig);