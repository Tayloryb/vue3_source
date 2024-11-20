module.exports = {
  plugins: {
    'postcss-pxtorem': {
      rootValue: 20, // 设计稿1600 / 10 
      unitPrecision: 9, // 计算结果保留9位小数
      selectorBlackList: ['.no-rem', 'no-rem'], // 忽略不转换成rem 保留px
      propList: ['*'], // 
      replace: true, // 替换原本的px
      mediaQuery: true,
      minPixelValue: 2, // 设置要替换的最小像素值
      // exclude: /node_modules/i, // 排除node_modules
    }
  }
}
