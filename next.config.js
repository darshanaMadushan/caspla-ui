loadEnv(process.env.APP_ENV)

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

module.exports = nextConfig;

/** @param {string} appEnv */
function loadEnv(appEnv = process.env.APP_ENV) {
  const env = {
    ...require(`./env/env.${appEnv}`),
    NEXT_PUBLIC_APP_ENV: appEnv,
  }

  Object.entries(env).forEach(([key, value]) => {
    process.env[key] = value;
  })
}
