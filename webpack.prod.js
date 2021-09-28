const HtmlWebPackPlugin     = require('html-webpack-plugin');
const MiniCssExtractPlugin  = require('mini-css-extract-plugin');
const CopyPlugin            = require('copy-webpack-plugin');

const CssMinimizer          = require('css-minimizer-webpack-plugin')
const Terser                = require('terser-webpack-plugin')


module.exports = {

    mode: 'production',

    output: {
        clean: true,
        filename: 'main.[contenthash].js'
    },

    module: {
        rules: [

            {
                test: /\.html$/i,
                loader: 'html-loader',
                options: {
                    sources: false,
                    minimize: false
                },
            },

            {
                test: /\.css$/i,
                exclude: /styles.css$/,
                use: ['style-loader','css-loader']
            },

            {
                test: /styles.css$/,
                use: [MiniCssExtractPlugin.loader, "css-loader"]
            },

            {
                test: /\.(png|jpe?g|gif)$/i,
                loader: 'file-loader'
            },

            { // babel
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },

        ]
    },

    // minimizar el archivo css
    optimization: {
        minimize: true,
        minimizer: [
            new CssMinimizer(),
            new Terser()
        ]
    },
    


    plugins: [
        new HtmlWebPackPlugin({
            template: './src/index.html',
            filename: './index.html',
            inject: 'body'
        }),


        new MiniCssExtractPlugin({
            // filename: '[name].[fullhash].css',
            filename: '[name].[fullhash].css',
            ignoreOrder: false
        }),

        // imagenes
        new CopyPlugin({
            patterns: [
                { from: "src/assets/", to: "assets/" },
            ]
        })

    ]

}