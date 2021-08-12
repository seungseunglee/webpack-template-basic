// import
const path = require('path')
const HtmlPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')

// export
module.exports = {
    // 파일을 읽어들이기 시작하는 진입점 설정
    entry: './js/main.js',
    
    // 결과물(번들)을 반환하는 설정
    output: {
        // path: path.resolve(__dirname, 'dist'),
        // filename: 'main.js',
        clean: true
    },

    module: {
        rules: [
            {
                test: /\.s?css$/, // .css 로 끝나는 파일
                use: [
                    // 다음 내용 순서 중요
                    'style-loader',     // (4) index.html에 style 태그로 삽입
                    'css-loader',       // (3) JS 파일에서 css 파일 해석, (2) 내용을 css-loader로 읽어 들임
                    'postcss-loader',   // (2) 이를 통해 공급업체 접두사를 적용, 그 외 postcss 플러그인 사용
                    'sass-loader'       // (1) scss 파일을 sass-loader를 통해 해석
                ]
            },
            {
                test: /\.js$/,
                use: [
                    'babel-loader'
                ]
            }
        ]
    },

    // 번들링 후 결과물의 처리 방식 등 다양한 플러그인들을 설정
    plugins: [
        new HtmlPlugin({
            template: './index.html'
        }),
        new CopyPlugin({
            patterns: [
                { from: 'static' } // static 폴더의 내용을 dist 폴더로 복사하여 넣음
            ]
        })
    ]
}