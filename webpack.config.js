    import path from 'path'
    import { fileURLToPath } from 'url'
    import webpack from 'webpack'

    const __filename = fileURLToPath(import.meta.url)
    const __dirname = path.dirname(__filename)
    // either in env file or set to production
    const isProduction = /*process.env.NODE_ENV ==*/ 'production'

    const config = {
        entry: {
            employees: './src/employees.jsx',
        },
        output: {
            filename: '[name].bundle.js',
            path: path.resolve(__dirname, 'public')
        },
        //plugins: [],
        // ADD ANY WEBPACK PLUGINS HERE
        module: {
            rules: [
                {//find any jsx extensions
                    test: /\.jsx?$/,
                    exclude: /node_modules/,
                    loader: 'babel-loader',
                },
            ]
        },
        optimization: {
            splitChunks: {
                name: 'vendor',
                chunks: 'all',
            },
        },
        devtool: 'source-map'
    }

    export default function() {
        if(isProduction) {
            config.mode = 'production'
        }else {
            config.mode = 'development'
        }
        return config
    }