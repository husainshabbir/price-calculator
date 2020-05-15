/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable global-require */

/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

module.exports = {
  plugins: [
    "gatsby-plugin-typescript",
    "gatsby-plugin-root-import",
    "gatsby-plugin-react-helmet",
    {
      resolve: "gatsby-plugin-postcss",
      options: {
        postCssPlugins: [require("tailwindcss"), require("autoprefixer")],
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: "Price Calculator",
        short_name: "Price Calculator",
        start_url: "/",
        background_color: "#4299e1",
        theme_color: "#4299e1",
        display: "standalone",
        icon: "src/assets/icon-512x512.png",
        crossOrigin: `use-credentials`,
        cache_busting_mode: "none",
      },
    },
    {
      resolve: "gatsby-plugin-offline",
      options: {
        workboxConfig: {
          globPatterns: ["**/*"],
        },
      },
    },
  ],
};
