const path = require('path')
const { VueLoaderPlugin } = require('vue-loader')
// 让打包后的 JS 自动引入html文件中
const HtmlWebpackPlugin = require('html-webpack-plugin')
// elementPlus 按需引入
const AutoImport = require('unplugin-auto-import/webpack')
const Components = require('unplugin-vue-components/webpack')
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')



module.exports = env => {
    return {
        // 入口文件
        entry: './src/main.js',
        // 输出
        output: {
            // 所有文件的输出路径
            path: path.resolve(__dirname, "../dist"),
            // 输出文件名
            filename: 'static/js/main.js',
            // 自动清空上次打包内容
            clean: true
        },
        // 插件
        plugins: [
            new VueLoaderPlugin(),
            new HtmlWebpackPlugin({
                template: path.resolve(__dirname, '../public/index.html'),
                // 输出文件名
                filename: 'index.html'
            }),
            AutoImport({
                resolvers: [ElementPlusResolver()],
            }),
            Components({
                resolvers: [ElementPlusResolver()],
            }),
        ],
        // 模块
        module: {
            rules: [
                // 应用到 普通的 .js文件 和 .vue文件的 script块
                {
                    test: /\.vue$/,
                    loader: 'vue-loader'
                },
                // babel-loader
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: {
                        loader: "babel-loader",
                        options: {
                            presets: ["@babel/preset-env"]
                        }
                    }
                },
                // 资源模块
                {
                    test: /\.(png|svg|jpg|gif)$/,
                    type: 'asset',
                    generator: {
                        // 输出的图片名称
                        filename: "static/images/[hash][ext][query]"
                    },
                    parser: {
                        dataUrlCondition: {
                            // 小于 10kb 的图片转 base64
                            maxSize: 10 * 1024
                        }
                    }
                }
            ]
        },
        resolve: {
            // 引入这些文件 可以不带后缀 按顺序解析
            extensions: ['.vue', '.js', '.json'],
            alias: {
                // @ 指向 src
                "@": path.resolve(__dirname, "../src")
            }
        }
    }
}