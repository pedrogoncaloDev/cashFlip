const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: process.env.NODE_ENV === 'production'
    ? '/cashFlip/' // caminho do repositório no GitHub Pages
    : '/',
  css: {
    loaderOptions: {
      sass: {
        implementation: require('sass')
      },
    },
  },
})
