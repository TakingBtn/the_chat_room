const { webpack,DefinePlugin } = require('webpack')
const {merge} = require('webpack-merge')
const common = require('./webpack.common')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin")  // css压缩

module.exports = env =>{
    let prod_config = {
        // 生产模式
        mode: 'production',
        devtool: 'source-map',   //开启将会生成map文件
        // 模块
        module: {
            rules: [
                {
                    test: /\.css$/,
                    use: [
                        // 提取css成单独文件
                        MiniCssExtractPlugin.loader,
                        'css-loader'
                    ]
                }
            ]
        },
        optimization: {
            minimizer: [
                new CssMinimizerPlugin()
            ]
        },
        // 插件
        plugins: [
            // ??
            new DefinePlugin({
                'process.env.NODE_ENV': JSON.stringify('production')
            }),
            // 提取css
            new MiniCssExtractPlugin({
                // 输出文件
                filename: `assets/css/[name].style.css`,
                // 和 流 什么关系？
                chunkFilename: `assets/css/[name].css`
            }),
            // 压缩css
            new CssMinimizerPlugin()
        ]
    }

    return merge(common(env),prod_config)   //合并配置
}