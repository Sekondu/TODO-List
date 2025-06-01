const path=require("path");
const HtmlWebpackPlugin=require("html-webpack-plugin");
const MiniCssExtractPlugin=require("mini-css-extract-plugin");

module.exports={
    mode:"development",
    entry:"./src/script.js",
    output:{
        filename:"main.js",
        path:path.resolve(__dirname,"dist"),
        clean:true,
    },
    devServer:{
        watchFiles: ['./src/index.html'],
    hot:true,
    open:true,
    },
    plugins:[
        new HtmlWebpackPlugin({
            template:"./src/index.html",
            scriptLoading:"defer",

        }),
        new MiniCssExtractPlugin({
            filename:"style.css",

        }),
    ],
    module:{
        rules:[
            {
                test:/\.css$/i,
                use:[MiniCssExtractPlugin.loader,"css-loader"],
            },
            {
                test:/\.html$/i,
                loader:"html-loader",
            },
            {
                test:/\.png$/i,
                type:'asset/resource',
            }
        ]
    }
}