module.exports = {
  productionSourceMap: false,
  transpileDependencies: ["vuetify"],
  css: {
    loaderOptions: {
      sass: {
        additionalData: `@import "@/sass/web.scss"`,
      },
    },
  },
  pages: {
    index: {
      // entry for the page
      entry: "src/main.js",
      // the source template
      template: "public/index.html",
      // output as dist/index.html
      filename: "index.html",
      // when using title option,
      // template title tag needs to be <title><%= htmlWebpackPlugin.options.title %></title>
      title: "Shibx Dashboard",
      // chunks to include on this page, by default includes
      // extracted common chunks and vendor chunks.
      chunks: ["chunk-vendors", "chunk-common", "index"],
    },
  },
  pwa: {
    name: "Shibx Dashboard",
    themeColor: "#4d0aaf",
    msTileColor: "#4d0aaf",
    appleMobileWebAppCapable: "yes",
    appleMobileWebAppStatusBarStyle: "#4d0aaf",
    manifestOptions: {
      background_color: "#4d0aaf"
    }
  }
};