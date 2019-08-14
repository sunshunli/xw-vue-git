var path = require('path');
var webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const ExtractTextPlugin = require('extract-text-webpack-plugin')
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = (env = {}) =>{
    console.log(`------------------- ${env.Generative?'生产':'开发'}环境 -------------------`);
    var plugins = (module.exports.plugins || []).concat([
        new CleanWebpackPlugin(['dist']),
        new UglifyJsPlugin({
            uglifyOptions: {
                compress: {
                    warnings: false
                }
            },
            sourceMap: false,
            parallel: true
        }),
        // new ExtractTextPlugin({
        //     filename:"le-components.min.css"
        // }),
        // new OptimizeCSSPlugin({
        //     cssProcessorOptions: true
        //       ? { safe: true, map: { inline: false } }
        //       : { safe: true }
        // }),
        new webpack.HashedModuleIdsPlugin(),
        new webpack.optimize.ModuleConcatenationPlugin(),
    ])
    return {
        entry: './comps/leComponents.js',//入口
        output: {
            path: path.resolve(__dirname, './dist'),//输出结果
            filename: "le-components.min.js",
            library:"le-components",
            libraryTarget : "umd",
        },
        module: {
            rules: [
                {
                    test: /\.vue$/,
                    loader: 'vue-loader',
                    options: {
                        loaders: {
                        },
                        presets: ['es2015'],
                        plugins: ['transform-runtime', 'transform-object-rest-spread']
                    },
                },
                {
                    test: /\.js$/,
                    loader: 'babel-loader',
                    exclude: /node_modules/
                },
                {
                    test: /\.(png|jpg|gif|svg)$/,
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]?[hash]',
                        limit: 8192,
                        outputPath: 'static/images/'
                    }
                },
                {
                    test: /\.css$/,
                    loader: "style-loader!css-loader",
                    // use: ExtractTextPlugin.extract({
                    //     fallback: "style-loader", // fallback表示如果css文件没有成功导入就使用style-loader导入
                    //     use: "css-loader" // 表示使用css-loader从js读取css文件
                    // })
                },
                {
                    test: /\.(woff|woff2|svg|eot|ttf)\??.*$/,
                    loader:'url-loader',options:{name:'fonts/[name].[hash:8].[ext]'}//项目设置打包到dist下的fonts文件夹下
                },
                {
                    test: /\.html$/,
                    loader: 'html-loader',
                    options: {
                        minimize: false
                    }
                }
            ]
        },
        resolve: {
            extensions: ['.vue', '.js', '.json'],
            alias: {
                'vue$': 'vue/dist/vue.esm.js'
            }
        },
        performance: {
            hints: false
        },
        plugins:plugins,
        // devtool: '#eval-source-map'//开发模式下更方便定位错误
        devtool:env.Generative?false:'#eval-source-map'
    }
}
