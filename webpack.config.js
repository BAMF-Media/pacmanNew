const path = require("path")

module.exports = {
    mode: 'development',
    devtool: 'inline-source-map',
    entry: {
        game: './src/public/script/game.tsx',
        dashboard: './src/public/script/dashboard.tsx'
    },
    watch: true,
    watchOptions: {
        aggregateTimeout: 300,
        poll: 100
    },
    output: {
        path: path.resolve(__dirname, "build/scripts/"),
        filename: "[name].js"
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js']
    },
    module: {
        rules: [
            { test: /\.tsx?$/, loader: 'ts-loader' }
        ]
    }
}