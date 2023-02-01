const {merge} = require("webpack-merge")
const common = require("./webpack.common")

module.exports = (env)=>{
    let dev_config = {
        // 开启source map
        devtool: 'inline-source-map',
        // 开发模式
        mode: "development",
        // 模块
        module: {
            rules: [
                // 处理css
                // 处理sass 和 less 需要另外写
                {
                    test: /\.css$/,
                    use: [
                        "style-loader",
                        "css-loader"
                    ]
                }
            ]
        },
        // 插件
        plugins: [],
        // 
        devServer: {
            host: "0.0.0.0",
            port: 8080,
            // open: true, //开服务就打开指定窗口
            proxy: {}
        }
    }

    // 合并配置
    return merge(common(env), dev_config)
}