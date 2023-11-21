/** @type {import('next').NextConfig} */
const nextConfig = {
	//profiler: process.env.PERFORMANCE === "true" ? true : false,
	experimental: {
		nextScriptWorkers: true,
	},
};

module.exports = nextConfig;
