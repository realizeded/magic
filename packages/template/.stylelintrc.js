module.exports = {
    extends: [
        'stylelint-config-standard',
        'stylelint-config-rational-order',
        'stylelint-prettier/recommended'
    ],
    rules: {
        // 'prettier/prettier': [true, { singleQuote: false }],
        // at-rule-no-unknown: 屏蔽一些scss等语法检查
        'at-rule-no-unknown': [true, { ignoreAtRules: ['mixin', 'extend', 'content'] }], // 禁止使用未知的 at 规则
        'rule-empty-line-before': [
            // 要求或禁止在规则声明以前有空行
            'always-multi-line',
            {
                except: ['first-nested'],
                ignore: ['after-comment']
            }
        ],
        'at-rule-empty-line-before': [
            // 要求或禁止在 at 规则以前有空行
            'always',
            {
                except: ['blockless-after-same-name-blockless', 'first-nested'],
                ignore: ['after-comment']
            }
        ],
        'comment-empty-line-before': [
            // 要求或禁止在注释以前有空行
            'always',
            {
                except: ['first-nested'],
                ignore: ['stylelint-commands']
            }
        ],
        'block-no-empty': true, // 禁止出现空块
        'declaration-empty-line-before': 'never', // 要求或禁止在声明语句以前有空行。
        'declaration-block-no-duplicate-properties': true, // 在声明的块中中禁止出现重复的属性
        'declaration-block-no-redundant-longhand-properties': true, // 禁止使用能够缩写却不缩写的属性。
        'shorthand-property-no-redundant-values': true, // 禁止在简写属性中使用冗余值。
        'function-url-quotes': 'always', // 要求或禁止 url 使用引号。
        'color-hex-length': 'short', // 指定十六进制颜色是否使用缩写
        'color-named': 'never', // 要求 (可能的状况下) 或 禁止使用命名的颜色
        'comment-no-empty': true, // 禁止空注释
        'font-family-name-quotes': 'always-unless-keyword', // 指定字体名称是否须要使用引号引发来 | 期待每个不是关键字的字体名都使用引号引发来
        'font-weight-notation': 'numeric', // 要求使用数字或命名的 (可能的状况下) font-weight 值
        'property-no-vendor-prefix': true, // 禁止属性使用浏览器引擎前缀
        'value-no-vendor-prefix': true, // 禁止给值添加浏览器引擎前缀
        'selector-no-vendor-prefix': true, // 禁止使用浏览器引擎前缀
        'no-descending-specificity': null // 禁止低优先级的选择器出如今高优先级的选择器以后
    }
};
