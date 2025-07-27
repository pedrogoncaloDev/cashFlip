module.exports = {
    preset: 'ts-jest/presets/default',
    testEnvironment: 'jsdom',
    moduleFileExtensions: ['ts', 'js', 'vue', 'json'],
    transform: {
        '^.+\\.ts$': ['ts-jest', { babelConfig: true }],
        '^.+\\.vue$': 'vue-jest'
    },
    testRegex: '(/__tests__/.*|(\\.|/)(spec))\\.ts$',
};
