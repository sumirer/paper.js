const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: "development",
    entry: './index.ts',
    output:{
        path:path.resolve(__dirname,"dist"),
        filename:'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                loader: 'ts-loader',
                exclude: /node_modules/,
            },
        ]
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"]
    },
    plugins: [new HtmlWebpackPlugin({ template: './index.html' })],
    devServer:{
        contentBase:path.join(__dirname,'dist'),
        open:true,
        port:9000,
    }
};
