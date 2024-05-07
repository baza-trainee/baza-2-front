const createNextIntlPlugin = require("next-intl/plugin");
const svg = require("@neodx/svg/webpack");

const withNextIntl = createNextIntlPlugin();

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

module.exports = withNextIntl(nextConfig);