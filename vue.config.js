const { postcss } = require('postcss-px2rem');
const port = process.env.port || 80 // 端口
const path = require('path');
function resolve(dir) {
    return path.join(__dirname, dir);
  }

module.exports = {
    lintOnSave: false, // 当保存时不进行eslint的检查
    devServer:{
        open:false, //自动打开默认浏览器
        port: port,
        host: '0.0.0.0',
        //用代理, 首先你得有一个标识, 告诉他你这个连接（也就是前缀是target 的地址）要用代理. 不然的话, 可能你的 html, css, js这些静态资源都跑去代理. 所以我们只要接口用代理, 静态文件用本地.
        proxy: {
            [process.env.VUE_APP_BASE_API]: { //识别所有前缀是 process.env.VUE_APP_BASE_API 的接口 将 target地址进行拼接 注意 是拼接不是替换
                //例如 process.env.VUE_APP_BASE_API = '/api' 请求路径为 '/demo/list'，因为在http.js中封装的axios中 设置了 baseURL 为 process.env.VUE_APP_BASE_API
                // 所以现在所有的请求路径都会变为 '/api/demo/list'，然后
                //proxy 就会识别请求路径中含有 '/api'的请求路径，在所有包含'/api'的请求路径前拼接 target 地址，此时请求路径就变为 `http://192.168.1.100:10002/api/demo/list`
                //但是我们需要的请求路径中并不包含 '/api', 此时就需要将 所有 '/api' 进行重写 用 '^' 匹配 目标标识 重写为 '' 此时请求地址就变成 `http://192.168.1.100:10002/demo/list` 即我们的目标地址
                target: `http://192.168.1.100:10002`, //只需将target地址修改成服务器接口的地址
                changeOrigin: true,
                pathRewrite: {
                  ['^' + process.env.VUE_APP_BASE_API]: ''
                }
            }
        },
        disableHostCheck: true
    },
    css: {
        loaderOptions: {
            css: {},
            postcss: {
                plugins: [
                    require('postcss-px2rem')({
                        remUnit: 144
                    }),
                    postcss
                ]
            },
            sass: {
                // @/ 是 src/ 的别名
                // 所以这里假设你有 `src/variables.sass` 这个文件
                // 注意：在 sass-loader v9 中，这个选项名是 "additionalData" v7中这个选项名是data
                prependData: `@import "@/assets/styles/common.scss";`
            }
        }
    },
    chainWebpack: (config) => { //配置路径别名
        config.resolve.alias
          .set('@', resolve('src'))
          .set('@assets',resolve('src/assets'))
          .set('@components',resolve('src/components'))
          .set('@network',resolve('src/network'))
          .set('@router',resolve('src/router'))
          .set('@store',resolve('src/store'))
          .set('@views',resolve('src/views'))
      }
}