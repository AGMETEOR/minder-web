/** @type {import('next').NextConfig} */

const withNextIntl = require('next-intl/plugin')();

const nextConfig = {
	images: {
		domains: ['github.com'],
	}
}

module.exports = withNextIntl(nextConfig);
