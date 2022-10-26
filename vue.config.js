const { postcss } = require('postcss-px2rem');

module.exports = {
    lintOnSave: false, // 当保存时不进行eslint的检查
    devServer:{
        open:false//自动打开默认浏览器
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
    }
}