const path = require('path');
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const EslintPlugin = require('eslint-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const pages = ['index', 'product-details', 'cart'];

const baseConfig = {
    entry: pages.reduce((config, page) => {
        config[page] = `./src/${page}`;
        return config;
    }, {}),
    optimization: {
        splitChunks: {
        chunks: "all",
        },
    },
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
                
            },
            { test: /\.ts$/i, use: 'ts-loader' },
            {
                test: /\.(jpg|svg|png|jpeg)$/,
                loader: 'file-loader',
                options: {
                    name: '[path][name].[ext]'
                    },
            },
        ],
    },
    resolve: {
        extensions: ['.js','.ts'],
    },
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, './dist'),
    },
    plugins: [
        new CleanWebpackPlugin(),
        new EslintPlugin({ extensions: 'ts' }),
        new CopyWebpackPlugin ({
            patterns: [
                { from: 'src/assets', to: 'assets' }
        ]
    }),
    ]
    .concat(
        pages.map(
        (page) =>
            new HtmlWebpackPlugin({
            inject: true,
            template: `./src/${page}.html`,
            filename: `${page}.html`,
            chunks: [page],
            })
        )
    ).concat(
        new MiniCssExtractPlugin({
        filename: `[name].css`,
        chunkFilename: '[id].css',
        }),
    ),
};

module.exports = ({ mode }) => {
    const isProductionMode = mode === 'prod';
    const envConfig = isProductionMode ? require('./webpack.prod.config') : require('./webpack.dev.config');

    return merge(baseConfig, envConfig);
};
