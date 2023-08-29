const path = require('path');

module.exports = {
    mode: 'development',
    entry: './ts/index.ts', // プロジェクトのエントリーポイントファイル
    output: {
        filename: 'main.js', // 出力されるファイル名
        path: path.resolve(__dirname, 'template/js') // 出力ディレクトリ
    },
    resolve: {
        extensions: ['.ts', '.js'] // インポート時に拡張子を省略できるように設定
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    }
};
