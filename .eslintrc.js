module.exports = {
    "env": {
        "node": true,
        "commonjs": true,
        "es2021": true,
        'jest': true,
    },
    "parserOptions": {
        "ecmaVersion": "latest"
    },
    "rules": {
        'eqeqeq': 'error',
        'object-curly-spacing': [
            'error', 'always'
        ],
        'arrow-spacing': [
            'error', { 'before': true, 'after': true }
        ],
    }
}